import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorService } from '@core/services/sector.service';
import { Sector } from '@core/types';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ToastComponent, ToastType } from '@shared/components/ui/toast/toast.component';
import { ZardButtonComponent } from '@shared/components/ui/button/button.component';
import { ZardInputDirective } from '@shared/components/ui/input/input.directive';
import { ZardSkeletonComponent } from '@shared/components/ui/skeleton/skeleton.component';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [
    CommonModule,
    ZardIconComponent,
    ModalComponent,
    FormsModule,
    ToastComponent,
    ZardButtonComponent,
    ZardInputDirective,
    ZardSkeletonComponent,
  ],
  templateUrl: './sectors.component.html',
})
export class SectorsComponent {
  private sectorService = inject(SectorService);
  private cdr = inject(ChangeDetectorRef);
  sectors = signal<Sector[]>([]);
  isLoading = true;

  // Toast
  toastMessage = '';
  toastType: ToastType = 'success';
  toastTrigger = 0;

  showForm = false;
  isEditing = false;
  sectorForm: Partial<Sector> = { name: '' };

  ngOnInit() {
    this.loadSectors();
  }

  loadSectors() {
    this.isLoading = true;
    this.sectorService
      .getSectors()
      .pipe(
        delay(500),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((data) => {
        this.sectors.set(data);
      });
  }

  showToast(message: string, type: ToastType = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastTrigger++;
    this.cdr.detectChanges();
  }

  startAdd() {
    this.showForm = true;
    this.isEditing = false;
    this.sectorForm = { name: '' };
  }

  startEdit(sector: Sector) {
    this.showForm = true;
    this.isEditing = true;
    this.sectorForm = { ...sector };
  }

  deleteSector(id: number | string) {
    if (confirm('Tem certeza que deseja excluir este setor?')) {
      this.sectorService.deleteSector(id).subscribe({
        next: () => {
          this.showToast('Setor excluído com sucesso!', 'success');
          this.loadSectors();
        },
        error: (err) => {
          console.error('Error deleting sector:', err);
          this.showToast('Erro ao excluir setor.', 'error');
        },
      });
    }
  }

  save() {
    if (this.isEditing && this.sectorForm.id) {
      this.sectorService.updateSector(this.sectorForm.id, this.sectorForm).subscribe({
        next: () => {
          this.showToast('Setor atualizado com sucesso!', 'success');
          this.loadSectors();
          this.cancel();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error updating sector:', err);
          this.showToast(
            'Erro ao atualizar setor: ' + (err.error?.message || 'Erro desconhecido'),
            'error'
          );
        },
      });
    } else {
      // API expects only name for creation
      const { name } = this.sectorForm;
      this.sectorService.createSector({ name: name! }).subscribe({
        next: () => {
          this.showToast('Setor criado com sucesso!', 'success');
          this.loadSectors();
          this.cancel();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error creating sector:', err);
          this.showToast(
            'Erro ao criar setor: ' + (err.error?.message || 'Erro desconhecido'),
            'error'
          );
        },
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.sectorForm = { name: '' };
  }
}

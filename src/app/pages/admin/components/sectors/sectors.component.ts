import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectorService } from '@core/services/sector.service';
import { Sector } from '@core/types';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './sectors.component.html',
})
export class SectorsComponent {
  private sectorService = inject(SectorService);
  sectors$ = this.sectorService.getSectors();

  sectorForm: Partial<Sector> = {};
  showForm = false;
  isEditing = false;

  startAdd() {
    this.showForm = true;
    this.isEditing = false;
    this.sectorForm = {};
  }

  startEdit(sector: Sector) {
    this.showForm = true;
    this.isEditing = true;
    this.sectorForm = { ...sector };
  }

  async save() {
    if (this.isEditing && this.sectorForm.id) {
      await this.sectorService.updateSector(this.sectorForm.id, this.sectorForm);
    } else {
      await this.sectorService.createSector(this.sectorForm as Sector);
    }
    this.cancel();
  }

  cancel() {
    this.showForm = false;
    this.isEditing = false;
    this.sectorForm = {};
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.sectorService.deleteSector(id);
    }
  }
}

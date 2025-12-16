import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { User } from '@core/types';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SectorService } from '@core/services/sector.service';
import { ZardIconComponent } from '@shared/components/ui/icon/icon.component';
import { ToastComponent, ToastType } from '@shared/components/ui/toast/toast.component';
import { ZardButtonComponent } from '@shared/components/ui/button/button.component';
import { ZardInputDirective } from '@shared/components/ui/input/input.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ZardIconComponent,
    ToastComponent,
    ZardButtonComponent,
    ZardInputDirective,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private sectorService = inject(SectorService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  pagedUsers: User[] = [];
  sectors$ = this.sectorService.getSectors();

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  // Toast
  toastMessage = '';
  toastType: ToastType = 'success';
  toastTrigger = 0;

  userForm: Partial<User> = {
    name: '',
    username: '',
    password: '',
    cargo: 'operador',
    sector: '',
    image: '',
  };
  showForm = false;
  isEditing = false;

  ngOnInit() {
    this.refreshUsers();
  }

  updatePagedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedUsers();
    }
  }

  startAdd() {
    this.showForm = true;
    this.isEditing = false;
    this.userForm = {
      name: '',
      username: '',
      password: '',
      cargo: 'operador',
      sector: '',
      image: '',
    };
  }

  startEdit(user: User) {
    this.showForm = true;
    this.isEditing = true;
    this.userForm = { ...user };
  }

  showToast(message: string, type: ToastType = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastTrigger++;
    this.cdr.detectChanges();
  }

  save() {
    // Basic Client-side Validation
    if (!this.userForm.name || !this.userForm.username || !this.userForm.sector) {
      this.showToast('Preencha os campos obrigatórios!', 'error');
      return;
    }

    // Set default image if empty (to satisfy min-length 7)
    if (!this.userForm.image || this.userForm.image.length < 7) {
      this.userForm.image =
        'https://ui-avatars.com/api/?name=' + encodeURIComponent(this.userForm.name);
    }

    if (this.isEditing && this.userForm.id) {
      this.userService.updateUser(this.userForm.id, this.userForm).subscribe({
        next: () => {
          this.refreshUsers();
          this.cancel();
          this.showToast('Usuário atualizado com sucesso!', 'success');
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.showToast('Erro ao atualizar: ' + (err.error?.message || 'Desconhecido'), 'error');
        },
      });
    } else {
      // Create
      if (!this.userForm.password || this.userForm.password.length < 1) {
        this.showToast('Senha é obrigatória!', 'error');
        return;
      }
      this.userService.createUser(this.userForm as User).subscribe({
        next: () => {
          this.refreshUsers();
          this.cancel();
          this.showToast('Usuário criado com sucesso!', 'success');
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.showToast('Erro ao criar: ' + (err.error?.message || 'Desconhecido'), 'error');
        },
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.isEditing = false;
    this.userForm = {
      name: '',
      username: '',
      password: '',
      cargo: 'operador',
      sector: '',
      image: '',
    };
  }

  delete(id: number | string) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.refreshUsers();
          this.showToast('Usuário excluído com sucesso!', 'success');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.showToast('Erro ao excluir usuário.', 'error');
        },
      });
    }
  }

  private refreshUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.updatePagedUsers();
      this.cdr.detectChanges();
    });
  }
}

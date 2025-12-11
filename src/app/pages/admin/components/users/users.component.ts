import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { User } from '@core/types';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private userService = inject(UserService);
  users$ = this.userService.getUsers();

  userForm: Partial<User> = { role: 'operador' };
  showForm = false;
  isEditing = false;

  startAdd() {
    this.showForm = true;
    this.isEditing = false;
    this.userForm = { role: 'operador' };
  }

  startEdit(user: User) {
    this.showForm = true;
    this.isEditing = true;
    this.userForm = { ...user };
  }

  async save() {
    if (this.isEditing && this.userForm.id) {
      await this.userService.updateUser(this.userForm.id, this.userForm);
    } else {
      await this.userService.createUser(this.userForm as User);
    }
    this.cancel();
  }

  cancel() {
    this.showForm = false;
    this.isEditing = false;
    this.userForm = { role: 'operador' };
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id);
    }
  }
}

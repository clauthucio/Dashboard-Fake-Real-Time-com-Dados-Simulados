import { inject, Injectable } from '@angular/core';
import { User } from '@core/types';

import { Observable } from 'rxjs';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(Api);

  getUsers(): Observable<User[]> {
    return this.api.getUsers();
  }

  getUserById(id: number | string): Observable<User> {
    return this.api.getUserById(id);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.api.createUser(user);
  }

  updateUser(id: number | string, user: Partial<User>): Observable<User> {
    return this.api.updateUser(id, user);
  }

  deleteUser(id: number | string): Observable<boolean> {
    return this.api.deleteUser(id);
  }
}

import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageHandlingService } from '@shared/services/message-handling.service';
import { User } from '../models/user.model';
import { UserManagementHttpService } from './user-management-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementUserService {
  private userManagementHttpService = inject(UserManagementHttpService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageHandlingService);

  private _users$ = new BehaviorSubject<User[]>([]);
  users$ = from(this._users$);

  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = from(this._user$);

  selectedUser: User | null = null;

  userListLoader = false;
  userLoader = false;

  getUsers() {
    this.userListLoader = true;
    this.userManagementHttpService
      .getUsersList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error);
          this.userListLoader = false;
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.userListLoader = false;
          this._users$.next(data.users);
        }
      });
  }

  getUser() {
    this.userLoader = true;
    if (this.selectedUser) {
      this.userManagementHttpService
        .getUserInfo(this.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error);
            this.userLoader = false;
            return of(null);
          })
        )
        .subscribe((data) => {
          this._user$.next(data);
          this.userLoader = false;
        });
    }
  }
  clearUser() {
    this._user$.next(null);
    this.userLoader = false;
  }
}

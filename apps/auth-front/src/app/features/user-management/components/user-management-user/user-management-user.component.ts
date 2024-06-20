import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { User } from '../../models/user.model';
import { UserManagementUserService } from '../../services/user-management-user.service';
import { CommonModule } from '@angular/common';
import { UserManagementUserRolesService } from '../../services/user-management-user-roles.service';
import { UserManagementPermissionsListComponent } from '../user-management-permissions-list/user-management-permissions-list.component';
import { UserManagementRolesListComponent } from '../user-management-roles-list/user-management-roles-list.component';

@Component({
  selector: 'app-user-management-user',
  standalone: true,
  imports: [
    CommonModule,
    UserManagementPermissionsListComponent,
    UserManagementRolesListComponent,
  ],
  templateUrl: './user-management-user.component.html',
  styleUrl: './user-management-user.component.css',
})
export class UserManagementUserComponent {
  protected userManagementUserService = inject(UserManagementUserService);
  protected userManagementUserRolesService = inject(
    UserManagementUserRolesService
  );

  @Input() user: User | null;
}

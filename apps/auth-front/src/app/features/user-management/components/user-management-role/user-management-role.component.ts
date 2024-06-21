import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '@features/role-management/models/role.model';
import { RoleManagementHttpService } from '@features/role-management/services/role-management-http.service';
import { UserManagementUserRolesService } from '@features/user-management/services/user-management-user-roles.service';

@Component({
  selector: 'app-user-management-role',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAccordionModule],
  templateUrl: './user-management-role.component.html',
  styleUrl: './user-management-role.component.css',
})
export class UserManagementRoleComponent {
  protected userManagementUserRolesService = inject(
    UserManagementUserRolesService
  );
  private roleManagementHttpService = inject(RoleManagementHttpService);

  @Input() role: Role;
  appsWithPermissions: any;

  loadRole() {
    this.roleManagementHttpService
      .getPermissionByRole(this.role.id)
      .subscribe((data) => {
        this.appsWithPermissions = data.permissions_by_app;
      });
  }
}

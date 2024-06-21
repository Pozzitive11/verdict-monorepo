import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { UserManagementUserPermissionsService } from "@features/user-management/services/user-management-user-permissions.service";
import { UserManagementUserRolesService } from "@features/user-management/services/user-management-user-roles.service";
import { UserManagementUserService } from "@features/user-management/services/user-management-user.service";
import { UserManagementUserComponent } from "../user-management-user/user-management-user.component";

@Component({
  selector: "app-user-management-users-list",
  standalone: true,
  imports: [
    CommonModule,
    UserManagementUserComponent,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: "./user-management-users-list.component.html",
  styleUrl: "./user-management-users-list.component.css",
})
export class UserManagementUsersListComponent implements OnInit {
  protected userManagementUserService = inject(UserManagementUserService);
  protected userManagementUserRolesService = inject(
    UserManagementUserRolesService,
  );
  protected userManagementUserPermissionsService = inject(
    UserManagementUserPermissionsService,
  );

  ngOnInit(): void {
    this.userManagementUserService.getUsers();
  }

  userSelection() {
    this.userManagementUserService.getUser();
    this.userManagementUserRolesService.getUserRoles();
    if (this.userManagementUserService.selectedUser === null) {
      this.userManagementUserService.clearUser();
    }
  }
}

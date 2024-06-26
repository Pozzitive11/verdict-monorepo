import { Component, OnChanges, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { UserManagementUserRolesService } from "@features/user-management/services/user-management-user-roles.service";
import { UserManagementRoleComponent } from "../user-management-role/user-management-role.component";
import { ModalComponent } from "@global-shared/components";

@Component({
  selector: "app-user-management-roles-list",
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    NgSelectModule,
    FormsModule,
    NgbAccordionModule,
    UserManagementRoleComponent,
  ],
  templateUrl: "./user-management-roles-list.component.html",
  styleUrl: "./user-management-roles-list.component.css",
})
export class UserManagementRolesListComponent implements OnInit, OnChanges {
  protected userManagementUserRolesService = inject(
    UserManagementUserRolesService,
  );
  ngOnInit(): void {
    this.userManagementUserRolesService.getAvailableRoles();
  }
  ngOnChanges(): void {
    this.userManagementUserRolesService.getAvailableRoles();
  }
  clearDeleteRoleModal() {
    this.userManagementUserRolesService.selectedRoleForDelete = null;
  }
  clearAddRoleModal() {
    this.userManagementUserRolesService.selectedRoleForAdd = null;
  }
}

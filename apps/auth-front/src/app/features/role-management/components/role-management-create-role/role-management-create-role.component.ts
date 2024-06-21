import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RoleManagementRoleService } from "@features/role-management/services/role-management-role.service";
import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
  selector: "app-role-management-create-role",
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: "./role-management-create-role.component.html",
  styleUrl: "./role-management-create-role.component.css",
})
export class RoleManagementCreateRoleComponent {
  protected roleManagementRoleService = inject(RoleManagementRoleService);
  clearValue() {
    this.roleManagementRoleService.createRoleName = "";
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core'
import { RoleManagementRoleService } from '../../services/role-management-role.service'
import { CommonModule } from '@angular/common'
import { Permission, Role } from '../../models/role.model'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { RoleManagementPermissionService } from '../../services/role-management-permission.service'
import { ProjectManagementAppService } from 'src/app/features/project-management/services/project-management-app.service'
import { UtilFunctions } from 'src/app/shared/utils/util.functions'

@Component({
  selector: 'app-role-management-role',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, NgSelectModule],
  templateUrl: './role-management-role.component.html',
  styleUrl: './role-management-role.component.css'
})
export class RoleManagementRoleComponent implements OnInit, OnChanges {
  protected roleManagementRoleService = inject(RoleManagementRoleService)
  protected roleManagementPermissionService = inject(RoleManagementPermissionService)
  @Input() role: Role | null
  updateRoleName = ''
  isAppSelected = false
  isRolePermissionGroupsEmpty = true
  ngOnInit(): void {
    this.updateRoleNameFromRole()
    this.roleManagementPermissionService.setApps()
    if (this.role) {
      this.roleManagementPermissionService.setPermissionsByRole(this.role.id)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('role' in changes) {
      this.updateRoleNameFromRole()
      if (this.role) {
        this.roleManagementPermissionService.setPermissionsByRole(this.role.id)
      }
      this.isRolePermissionGroupsEmpty =
        UtilFunctions.getObjectKeys([this.roleManagementRoleService.rolePermissionsGroups]).length === 0
    }
  }
  private updateRoleNameFromRole(): void {
    if (this.role) {
      this.updateRoleName = this.role.Name
    }
  }
  updateRole() {
    this.roleManagementRoleService.updateRole(this.updateRoleName)
  }
  getSelectedAppForUpdate() {
    this.isAppSelected = true
    if (this.role) {
      this.roleManagementPermissionService.setPermissionByApp(this.role.id)
    }
  }
  addRolePermissions() {
    if (this.role) {
      this.roleManagementPermissionService.addRolePermissions(this.role.id)
    }
    this.isAppSelected = false
  }
  deletePermission() {
    if (this.role) {
      this.roleManagementPermissionService.deletePermission(this.role.id)
    }
  }

  getSelectedAppForDelete() {
    if (this.roleManagementPermissionService.selectedAppForDelete) {
      this.roleManagementPermissionService.getPermissionsByApp(
        this.roleManagementPermissionService.selectedAppForDelete
      )
    }
  }
}

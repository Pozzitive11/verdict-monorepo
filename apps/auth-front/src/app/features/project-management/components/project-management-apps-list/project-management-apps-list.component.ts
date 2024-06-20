import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ProjectManagementAppComponent } from '../project-management-app/project-management-app.component'
import { ProjectManagementCreateAppComponent } from '../project-management-create-app/project-management-create-app.component'
import { ProjectManagementAppService } from '../../services/project-management-app.service'

@Component({
  selector: 'app-project-management-apps-list',
  standalone: true,
  imports: [CommonModule, ProjectManagementAppComponent, ProjectManagementCreateAppComponent],
  templateUrl: './project-management-apps-list.component.html',
  styleUrl: './project-management-apps-list.component.css'
})
export class ProjectManagementAppsListComponent {
  protected projectManagementAppService = inject(ProjectManagementAppService)
}

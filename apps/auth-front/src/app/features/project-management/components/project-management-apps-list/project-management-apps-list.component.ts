import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ProjectManagementAppService } from "@features/project-management/services/project-management-app.service";
import { ProjectManagementAppComponent } from "../project-management-app/project-management-app.component";
import { ProjectManagementCreateAppComponent } from "../project-management-create-app/project-management-create-app.component";

@Component({
  selector: "app-project-management-apps-list",
  standalone: true,
  imports: [
    CommonModule,
    ProjectManagementAppComponent,
    ProjectManagementCreateAppComponent,
  ],
  templateUrl: "./project-management-apps-list.component.html",
  styleUrl: "./project-management-apps-list.component.css",
})
export class ProjectManagementAppsListComponent {
  protected projectManagementAppService = inject(ProjectManagementAppService);
}

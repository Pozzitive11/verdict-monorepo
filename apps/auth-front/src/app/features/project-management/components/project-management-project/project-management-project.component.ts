import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Project } from "@features/project-management/models/project.model";
import { ProjectManagementAppService } from "@features/project-management/services/project-management-app.service";
import { ProjectManagementProjectService } from "@features/project-management/services/project-management-project.service";
import { ProjectManagementAppsListComponent } from "../project-management-apps-list/project-management-apps-list.component";
import { ModalComponent } from "@global-shared/components";
@Component({
  selector: "app-project-management-project",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProjectManagementAppsListComponent,
    ModalComponent,
  ],
  templateUrl: "./project-management-project.component.html",
  styleUrl: "./project-management-project.component.css",
  providers: [ProjectManagementAppService],
})
export class ProjectManagementProjectComponent implements OnInit {
  protected projectManagementProjectService = inject(
    ProjectManagementProjectService,
  );
  protected projectManagementAppService = inject(ProjectManagementAppService);

  @Input() project: Project;
  showBody = false;

  updateProjectName = "";
  updateProjectDescription = "";

  ngOnInit(): void {
    this.setProjectValues();
  }

  toggleShow() {
    if (this.projectManagementAppService.isDataLoaded) {
      this.showBody = !this.showBody;
    }
  }

  setProjectValues() {
    this.updateProjectName = this.project.Name;
    this.updateProjectDescription = this.project.Description;
  }

  deleteProject() {
    this.projectManagementProjectService.deleteProject(this.project.id);
  }

  updateProject() {
    this.projectManagementProjectService.updateProject(
      this.project.id,
      this.updateProjectName,
      this.updateProjectDescription,
    );
  }

  getProjectApps() {
    this.showBody = true;
    this.projectManagementAppService.setApps(this.project.id);
  }
}

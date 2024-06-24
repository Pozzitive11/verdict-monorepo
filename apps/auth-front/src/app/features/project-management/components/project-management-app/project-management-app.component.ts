import { Component, Input, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { App } from "@features/project-management/models/project.model";
import { ProjectManagementAppService } from "@features/project-management/services/project-management-app.service";
import { ModalComponent } from "@global-shared/components";

@Component({
  selector: "app-project-management-app",
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: "./project-management-app.component.html",
  styleUrl: "./project-management-app.component.css",
})
export class ProjectManagementAppComponent implements OnInit {
  protected projectManagementAppService = inject(ProjectManagementAppService);

  @Input() app: App;
  showBody = false;
  updateAppName = "";
  updateAppShortDescription = "";
  updateAppRoute = "";
  updateAppDescription = "";
  ngOnInit(): void {
    this.setAppValues();
  }
  toggleShow() {
    this.showBody = !this.showBody;
  }

  setAppValues() {
    this.updateAppName = this.app.Name;
    this.updateAppDescription = this.app.Description;
    this.updateAppShortDescription = this.app.ShortDescription;
    this.updateAppRoute = this.app.Route;
  }

  deleteApp() {
    this.projectManagementAppService.deleteApp(this.app.id);
  }

  updateApp() {
    this.projectManagementAppService.updateApp(
      this.app.id,
      this.updateAppName,
      this.updateAppDescription,
      this.updateAppShortDescription,
      this.updateAppRoute,
    );
  }
}

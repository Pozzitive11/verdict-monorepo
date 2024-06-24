import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import {
  HeaderComponent,
  AuthComponent,
  MessageBoxComponent,
} from "@global-shared/components";
import { SideNavToggle } from "@global-shared/models";
import { AuthService, NavigationService } from "@global-shared/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    HeaderComponent,
    AuthComponent,
    MessageBoxComponent,
  ],
})
export class AppComponent implements OnInit {
  title = "Verdict";

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private auth: AuthService,
    private navigation: NavigationService,
  ) {}

  get isAuthorized(): boolean {
    return this.auth.isAuthorized;
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    if (!this.isAuthorized) this.auth.autoLogIn();
  }
}

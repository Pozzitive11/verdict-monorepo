import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "@core/services/auth.service";
import { NavigationService } from "@core/services/navigation.service";
import {
  NavLinkInfo,
  navLinksDataModel,
} from "@shared/models/nav-links-data.model";
import { AccountInfoComponent } from "../account-info/account-info.component";
import { ProtectedLinkComponent } from "../protected-link/protected-link.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgFor,
    ProtectedLinkComponent,
    NgbDropdownItem,
    NgIf,
    AccountInfoComponent,
  ],
  styles: `
    .header-dropdown {
      scrollbar-color: #8890e7 #f0e0f5;
      scrollbar-width: thin;
    }
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  logInOut = "Увійти";
  logInOut$: Subscription | undefined;
  collapsed = true;
  private authService = inject(AuthService);
  private route = inject(Router);
  protected navigation = inject(NavigationService);

  get links(): NavLinkInfo[] {
    if (
      Object.keys(navLinksDataModel).includes(this.navigation.currentPage())
    ) {
      return navLinksDataModel[this.navigation.currentPage()].filter(link =>
        this.isLinkAvailable(link),
      );
    } else return this.pages;
  }

  get pages(): NavLinkInfo[] {
    return navLinksDataModel.mainPartsPages.filter(page =>
      this.isLinkAvailable(page),
    );
  }

  ngOnInit(): void {
    this.logInOut$ = this.authService.user.subscribe(user => {
      this.logInOut = user ? "Вийти" : "Увійти";
    });
  }

  ngOnDestroy(): void {
    this.logInOut$?.unsubscribe();
  }

  logIn_logOut() {
    this.logInOut === "Увійти"
      ? this.route.navigate(["/login"])
      : this.authService.logOut();
  }

  goToPage(page: NavLinkInfo) {
    this.route.navigate(["/auth" + page.link]).then();
  }

  isLinkAvailable(link: NavLinkInfo) {
    if (!this.authService.loadedUser) return false;
    for (const page of this.authService.loadedUser.pages) {
      if (page === link.link || link?.child_links?.length) return true;
      if (page.endsWith("*") && link.link.startsWith(page.slice(0, -1)))
        return true;
    }
    return false;
  }
}

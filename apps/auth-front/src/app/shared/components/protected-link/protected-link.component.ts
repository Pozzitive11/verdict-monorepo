import { Component, Input, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-protected-link",
  templateUrl: "./protected-link.component.html",
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
})
export class ProtectedLinkComponent {
  @Input() link!: { link: string; name: string; disabled: boolean };
  @Input() classNames!: string;
}

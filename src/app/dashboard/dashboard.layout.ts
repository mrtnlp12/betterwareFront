import { Component } from "@angular/core";
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: "./dashboard.layout.html",
  styles: [""]
})
export class DashboardLayoutComponent { }
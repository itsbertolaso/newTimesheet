import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public router: Router) {}

  ngOnInit() {}

  isLoggedIn() {
    return window.sessionStorage.getItem("token").length > 0;
  }

  logOff() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"], { replaceUrl: true });
  }
}

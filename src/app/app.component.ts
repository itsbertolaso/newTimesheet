import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { DataTableOptions } from "./api/datatable-options";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public router: Router) { }

  public title: string = "timesheet";

  /*isLoggedIn() {
    window.sessionStorage.getItem("token") != null;
    this.router.navigate(["/login"]);
  }*/
}


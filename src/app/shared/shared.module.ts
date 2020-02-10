import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableComponent } from "./datatable/datatable.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { FilterComponent } from "./filter/filter.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


@NgModule({
  declarations: [DatatableComponent, NavbarComponent, FilterComponent],
  exports: [DatatableComponent, NavbarComponent, FilterComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],



})
export class SharedModule {}

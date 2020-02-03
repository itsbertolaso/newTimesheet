import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { DipendentiPageComponent } from "./pages/dipendenti-page/dipendenti-page.component";
import { DettaglioDipendentiPageComponent } from "./pages/dettaglio-dipendenti-page/dettaglio-dipendenti-page.component";
import { NewDipendentiPageComponent } from "./pages/new-dipendenti-page/new-dipendenti-page.component";
import { EditDipendentiPageComponent } from "./pages/edit-dipendenti-page/edit-dipendenti-page.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "dipendenti",
    component: DipendentiPageComponent
  },
  {
    path: "dipendenti/create",
    component: NewDipendentiPageComponent
  },
  {
    path: "dipendenti/update/:id",
    component: EditDipendentiPageComponent
  },
  {
    path: "dipendenti/:id",
    component: DettaglioDipendentiPageComponent
  },
  {
    path: "**",
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

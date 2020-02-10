import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { DipendentiPageComponent } from "./pages/dipendenti-page/dipendenti-page.component";
import { DettaglioDipendentiPageComponent } from "./pages/dettaglio-dipendenti-page/dettaglio-dipendenti-page.component";
import { NewDipendentiPageComponent } from "./pages/new-dipendenti-page/new-dipendenti-page.component";
import { EditDipendentiPageComponent } from "./pages/edit-dipendenti-page/edit-dipendenti-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationGuard } from './shared/guard/authentication.guard';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: "dipendenti",
    component: DipendentiPageComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "dipendenti/create",
    component: NewDipendentiPageComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: "dipendenti/update/:id",
    component: EditDipendentiPageComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: "dipendenti/:id",
    component: DettaglioDipendentiPageComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: "**",
    component: HomePageComponent,
    canActivate:[AuthenticationGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate:[AuthenticationGuard],
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

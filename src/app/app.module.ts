import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { DipendentiPageComponent } from "./pages/dipendenti-page/dipendenti-page.component";
import { DettaglioDipendentiPageComponent } from "./pages/dettaglio-dipendenti-page/dettaglio-dipendenti-page.component";
import { NewDipendentiPageComponent } from "./pages/new-dipendenti-page/new-dipendenti-page.component";
import { EditDipendentiPageComponent } from "./pages/edit-dipendenti-page/edit-dipendenti-page.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "src/core/service/api.service";

import { AuthenticationGuard } from "./shared/guard/authentication.guard";
import { AuthenticationService } from "./shared/services/authentication.service";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { CardModule } from "primeng/card";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { RegisterPageComponent } from "./pages/register-page/register-page/register-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DipendentiPageComponent,
    DettaglioDipendentiPageComponent,
    NewDipendentiPageComponent,
    EditDipendentiPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule
  ],
  providers: [ApiService, AuthenticationGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}

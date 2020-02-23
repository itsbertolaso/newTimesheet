import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../shared/services/authentication.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public errorVisible: boolean = false;
  constructor(
    private FormBuilder: FormBuilder,
    public router: Router,
    public auth: AuthenticationService
  ) {
    this.createLoginForm();
  } //viene eseguito dentro il costruttore

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe(res => {
      console.log(res);

      if (res.status === 200) {
        if (res.response.jwt) {
          window.sessionStorage.setItem("token", res.response.jwt);
          this.router.navigate(["/dipendenti"], { replaceUrl: true });
        } else {
          this.errorVisible = true;
        }
      } else {
        if (res.status === 404) {
          this.errorVisible = true;
        }
      }
    });
  }

  private createLoginForm() {
    this.loginForm = this.FormBuilder.group({
      name: ["", [Validators.required]], //'' è di default
      password: ["", [Validators.required]]
    });
  }
  ngOnInit() {}
}

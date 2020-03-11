import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../../shared/services/authentication.service";
import { Router } from "@angular/router";
import { MustMatch } from "../../../shared/helpers/MustMatch";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup;

  get form() {
    return this.registerForm.controls;
  }

  constructor(
    private FormBuilder: FormBuilder,
    public router: Router,
    public auth: AuthenticationService
  ) {
    this.createregisterForm();
  } //viene eseguito dentro il costruttore

  onRegister() {
    if (!this.registerForm.invalid) {
      this.auth
        .register({
          name: this.registerForm.value.name,
          password: this.registerForm.value.password
        })
        .subscribe(res => {
          if (res.status === 201) {
            this.router.navigate(["/"], { replaceUrl: true });
          } else {
            if (res.status === 409) {
              alert("Utente gia registrato"); //alert temporaneo
            }
          }
        });
    }
  }

  private createregisterForm() {
    this.registerForm = this.FormBuilder.group(
      {
        name: ["", [Validators.required]], //'' è di default
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmpassword: ["", [Validators.required]]
      },
      { validator: MustMatch("password", "confirmpassword") }
    );
  }
  ngOnInit() {}
}

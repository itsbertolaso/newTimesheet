import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../../shared/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup;

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmpassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  constructor(
    private FormBuilder: FormBuilder,
    public router: Router,
    public auth: AuthenticationService
  ) {
    this.createregisterForm();
  } //viene eseguito dentro il costruttore

  onRegister() {
    this.auth
      .register({
        name: this.registerForm.value.name,
        password: this.registerForm.value.password
      })
      .subscribe(res => {
        console.log(res);
        if (res.status === 201) {
          this.router.navigate(["/"], { replaceUrl: true });
        } else {
          if (res.status === 409) {
            alert("Utente gia registrato"); //alert temporaneo
          }
        }
      });
  }

  private createregisterForm() {
    this.registerForm = this.FormBuilder.group(
      {
        name: ["", [Validators.required]], //'' è di default
        password: ["", [Validators.required]],
        confirmpassword: ["", [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
  }
  ngOnInit() {}
}

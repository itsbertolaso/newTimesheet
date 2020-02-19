import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private FormBuilder:FormBuilder,
    public router:Router, 
    public auth: AuthenticationService) 
   {
     this.createLoginForm()
  } //viene eseguito dentro il costruttore
  
  
  
  
  onLogin(){ 
    console.log(this.loginForm.controls['username'].value);
    console.log(this.loginForm.controls['password'].value);

    let isUserLogged = this.auth.login(this.loginForm.value);
    if(isUserLogged){
      if(this.loginForm.controls['username'].value=="chiave"){
      this.auth.setAuthenticated();
      }
      this.router.navigate(['/dipendenti']);

    }else{
      this.router.navigate(['/register']);

    }

    
  }

  private createLoginForm(){  
    this.loginForm=this.FormBuilder.group({
      username:['',[Validators.required]], //'' è di default
      password:['',[Validators.required]]
    });
    console.log(":", this.loginForm.value);

  }
  ngOnInit() {
  }

}
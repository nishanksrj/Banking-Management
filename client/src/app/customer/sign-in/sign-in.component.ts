import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, TokenPayload } from '../customer-authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  credentials : TokenPayload = {
    username: '',
    password: ''
  };

  serverErrorMessages: String;

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/');
    }
  }

  login(){
    this.auth.login(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/');
    },(err)=>{
      this.serverErrorMessages = err.error.message;
    });
  }

}

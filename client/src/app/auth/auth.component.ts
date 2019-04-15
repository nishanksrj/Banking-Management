import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, TokenPayload } from './authentication-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthenticationService, public router: Router) { }

  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  serverErrorMessages: string;

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/');
    }
  }

  login(){
    this.auth.login(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/');
    },(err) => {
      this.serverErrorMessages = err.error.message;
    });
  }

}

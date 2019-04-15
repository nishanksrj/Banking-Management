import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../employee-authentication.service';

export class User{
  username: string;
  name: string;
  password: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser: User = {
    name: '',
    username:'',
    password:''
  }
  serverErrorMessages: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.auth.register(this.newUser).subscribe(()=>{
      this.router.navigateByUrl('/');
    },(err)=>{
      this.serverErrorMessages = err.error.message;
    });
  }
}

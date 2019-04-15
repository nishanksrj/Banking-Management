import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public router: Router){ }
  title = 'client';
}

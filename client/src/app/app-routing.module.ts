import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'profile',component: UserComponent, canActivate: [AuthGuardService]
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

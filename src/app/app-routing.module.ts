import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { UploadService } from './core/upload.service';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'add-subject', component: AddsubjectComponent,  resolve: { data: UserResolver}},
  { path: 'upload/:currentUser/:role', component: UploadComponent,  resolve: { data: UserResolver}},
  { path: 'dashboard/:currentUser/:role', component: DashboardComponent,  resolve: { data: UserResolver}}
];
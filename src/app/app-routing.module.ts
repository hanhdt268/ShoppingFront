import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
 {
  path: 'home',
  component: HomeComponent,
  pathMatch: "full"
 },
 {
  path: 'login',
  component: LoginComponent,
  pathMatch: "full"
 },
 {
  path: 'admin',
  component: DashboardComponent,
  pathMatch: "full",
  canActivate: [AdminGuard]
 },
 {
  path: 'signup',
  component: SignupComponent,
  pathMatch: "full",
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

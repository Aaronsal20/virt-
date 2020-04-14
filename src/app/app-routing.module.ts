import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardServiceComponent } from './dashboard-service/dashboard-service.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceGuardService } from './services/auth-service-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', canActivate: [AuthGuardService], component: DashboardUserComponent },
  { path: 'service', canActivate: [AuthServiceGuardService], component: DashboardServiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

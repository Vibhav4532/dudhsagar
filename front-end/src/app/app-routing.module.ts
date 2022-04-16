import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContactComponent } from './static/components/contact/contact.component';

const routes: Routes = [{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},{path:'contact',component: ContactComponent},
{path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

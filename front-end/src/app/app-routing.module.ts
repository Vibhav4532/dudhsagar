import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './auth/components/admin/admin.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './business/components/home/home.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContactComponent } from './static/components/contact/contact.component';
import { GalleryComponent } from './static/components/gallery/gallery.component';
import { BookingListComponent } from './business/booking/components/bookinglist/bookinglist.component';
import { BookingAddComponent } from './business/booking/components/bookingadd/bookingadd.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path:'contact',component: ContactComponent},
{path:'gallery',component: GalleryComponent},
{path:'admin',component: AdminComponent},
{path:'home',component:HomeComponent},
{path:'bookinglist',component:BookingListComponent},
{path:'bookingadd',component:BookingAddComponent},
{path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

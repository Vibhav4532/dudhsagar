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
import { AdminhomeComponent } from './business/components/adminhome/adminhome.component';
import { DriveraddComponent } from './business/components/driveradd/driveradd.component';
import { DriverlistComponent } from './business/components/driverlist/driverlist.component';
import { VehicleaddComponent } from './business/components/vehicleadd/vehicleadd.component';
import { VehiclelistComponent } from './business/components/vehiclelist/vehiclelist.component';
import { HeaderComponent } from './auth/components/header/header.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';
import { BookingreportComponent } from './business/report/components/bookingreport/bookingreport.component';



const routes: Routes = [
  { path: 'base', redirectTo: '/' , pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bookinglist', component: BookingListComponent },
  { path: 'bookingreport', component: BookingreportComponent },
  { path: 'redirectBookinglist', redirectTo: '/bookinglist' , pathMatch: 'full' },
  { path: 'bookingadd', component: BookingAddComponent },
  { path: 'redirectBookingadd', redirectTo: '/bookingadd' , pathMatch: 'full' },
  { path: 'adminhome', component: AdminhomeComponent },
  {path:'driveradd',component:DriveraddComponent},
  {path:'driverlist',component:DriverlistComponent},
  {path:'vehicleadd',component:VehicleaddComponent},
  {path:'vehiclelist',component:VehiclelistComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'verify-email',component:VerifyEmailComponent},
  {path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

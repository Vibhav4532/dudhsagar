import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { ProfileComponent } from './main/profile/profile.component';
import { InterceptorService } from './services/interceptor-service.service';
import { ContactComponent } from './static/components/contact/contact.component';
import { AdminComponent } from './auth/components/admin/admin.component';
import { GalleryComponent } from './static/components/gallery/gallery.component';
import { AdminbookingComponent } from './business/components/adminbooking/adminbooking.component';
import { BookingListComponent } from './business/booking/components/bookinglist/bookinglist.component';
import { BookingviewComponent } from './business/booking/components/bookingview/bookingview.component';
import { BookingAddComponent } from './business/booking/components/bookingadd/bookingadd.component';
import { BookingupdateComponent } from './business/booking/components/bookingupdate/bookingupdate.component';
import { HomeComponent } from './business/components/home/home.component';
import { AdminhomeComponent } from './business/components/adminhome/adminhome.component';
import { DriveraddComponent } from './business/components/driveradd/driveradd.component';
import { DriverlistComponent } from './business/components/driverlist/driverlist.component';
import { PaymentComponent } from './business/components/payment/payment.component';
import { VehicleaddComponent } from './business/components/vehicleadd/vehicleadd.component';
import { VehiclelistComponent } from './business/components/vehiclelist/vehiclelist.component';
import { HeaderComponent } from './auth/components/header/header.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { BookingreportComponent } from './business/report/components/bookingreport/bookingreport.component';
import { BookingsearchComponent } from './business/booking/components/bookingsearch/bookingsearch.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ContactComponent,
    AdminComponent,
    GalleryComponent,
    AdminbookingComponent,
    BookingListComponent,
    BookingviewComponent,
    BookingAddComponent,
    BookingupdateComponent,
    HomeComponent,
    AdminhomeComponent,
    DriveraddComponent,
    DriverlistComponent,
    PaymentComponent,
    VehicleaddComponent,
    VehiclelistComponent,
    HeaderComponent,
    LogoutComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    BookingreportComponent,
    BookingsearchComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

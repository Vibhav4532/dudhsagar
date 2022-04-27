import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { ProfileComponent } from './main/profile/profile.component';
import { InterceptorService } from './services/interceptor-service.service';
import { ContactComponent } from './static/components/contact/contact.component';
import { DriverComponent } from './business/components/driver/driver.component';
import { AdminComponent } from './auth/components/admin/admin.component';
import { GalleryComponent } from './static/components/gallery/gallery.component';
import { AdminbookingComponent } from './business/components/adminbooking/adminbooking.component';
import { BookingListComponent } from './business/booking/components/bookinglist/bookinglist.component';
import { BookingviewComponent } from './business/booking/components/bookingview/bookingview.component';
import { BookingAddComponent } from './business/booking/components/bookingadd/bookingadd.component';
import { BookingupdateComponent } from './business/booking/components/bookingupdate/bookingupdate.component';
import { HomeComponent } from './business/components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ContactComponent,
    DriverComponent,
    AdminComponent,
    GalleryComponent,
    AdminbookingComponent,
    BookingListComponent,
    BookingviewComponent,
    BookingAddComponent,
    BookingupdateComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

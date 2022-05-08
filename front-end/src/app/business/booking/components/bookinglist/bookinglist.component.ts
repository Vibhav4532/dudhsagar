import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Booking } from 'src/app/business/booking';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData( ){
     /* Call the server only if the login was successful. */
     if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      console.log(userDetails[0].UserEmail);
      var userEmail =  userDetails[0].UserEmail;
      var userRole = userDetails[0].Userrole;
      this._api.postTypeRequest('book/getbookings',
                                  { 'email': userEmail , 'Userrole': userRole })
        .subscribe((res: any) => {
          console.log("res.status="+res.status);
            if (res.status) {
              console.log(res);
              console.log("res data="+res.data);
              this.bookings = res.data;
              console.log( this.bookings);
            }
      });
    } else {
      this._router.navigate(['/login']);
    }
  }

  // deleteBooking(id: number){
  //   /*this.bookingService.deleteBooking(id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.reloadData();
          
  //       },
  //       error => console.log(error));*/
  // }

  // bookingDetails(id: number){
  //   //this.router.navigate(['details', id]);
  // }

  // updateBooking(id: number){

  //   //this.router.navigate(['update', id]);

  // }
  }
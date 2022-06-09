import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Booking } from 'src/app/business/booking';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookingsearch',
  templateUrl: './bookingsearch.component.html',
  styleUrls: ['./bookingsearch.component.css']
})
export class BookingsearchComponent implements OnInit {

  bookings: Booking[] = [];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    /* Call the server only if the login was successful. */
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      var userEmail = userDetails[0].UserEmail;
      var userRole = userDetails[0].Userrole;
      console.log("Email="+userEmail);
      console.log("Role="+userRole);
      this._api.postTypeRequest('book/searchbookings',
        {  'email': userEmail, 'userRole': userRole })
        .subscribe((res: any) => {
          console.log("res.status=" + res.status);
          if (res.status) {
            console.log(res);
            console.log("res data=" + res.data);
            this.bookings = res.data;
            console.log(this.bookings);
          }
        });
    } else {
      this._router.navigate(['/login']);
    }
  }

  filter(form: NgForm) {
    let userDetailsJsonObject = this._auth.getUserDetails();
    var userDetails = JSON.parse(userDetailsJsonObject!);
    console.log(userDetails[0].UserEmail);
    var userEmail = userDetails[0].UserEmail;
    var userRole = userDetails[0].Userrole;

    var filterDateFrom = form.controls["filterDateFrom"].value;
    var filterDateTo = form.controls["filterDateTo"].value;

    //console.log(form.value.seats);
    var filterVehicleId = form.controls["filterVehicleId"].value;
    var filterEmail = form.controls["filterEmail"].value;

    this._api.postTypeRequest('book/searchbookings',
        { 'email': userEmail, 'userRole': userRole, 'filterDateFrom':filterDateFrom,'filterDateTo':filterDateTo, 'filterVehicleId':filterVehicleId, 'filterEmail':filterEmail })
        .subscribe((res: any) => {
          console.log("res.status=" + res.status);
          if (res.status) {
            console.log(res);
            console.log("res data=" + res.data);
            this.bookings = res.data;
            console.log(this.bookings);
          }
        });
  }

}

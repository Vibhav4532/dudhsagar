import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { NgForm } from '@angular/forms';
import { BookingReport } from 'src/app/business/bookingreport';

@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.css']
})
export class BookingreportComponent implements OnInit {

  bookings: BookingReport[] = [];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (this._auth.getUserDetails() && this._auth.getUserDetails()!.length > 1)
    {
      this.reloadData();
    }
    else{
      this._router.navigate(['/login']);
    }
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
      this._api.postTypeRequest('report/getbookings',
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

    this._api.postTypeRequest('report/getbookings',
        { 'email': userEmail, 'userRole': userRole, 'filterDateFrom':filterDateFrom,'filterDateTo':filterDateTo })
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

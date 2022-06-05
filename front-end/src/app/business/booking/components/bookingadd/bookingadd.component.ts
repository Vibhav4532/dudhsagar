import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookingadd',
  templateUrl: './bookingadd.component.html',
  styleUrls: ['./bookingadd.component.css']
})
export class BookingAddComponent implements OnInit {
  numSeatsOptions: any = ['1', '2', '3', '4', '5', '6', '7']
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _api: ApiService
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    console.log("Inside Confirm click");
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      console.log(userDetails[0].UserEmail);
      var userEmail = userDetails[0].UserEmail;
      // Read https://www.concretepage.com/angular-2/angular-2-ngform-with-ngmodel-directive-example
      // for directions to extract the dateTime below.
      console.log(form.controls["triptime"].value);
      var dateTime = form.controls["triptime"].value;
      //console.log(form.value.seats);
      var seats = form.controls["seats"].value;
      this._api.postTypeRequest('book/addbooking',
        { 'email': userEmail, 'dateTime': dateTime, 'seats': seats })
        .subscribe((res: any) => {
          console.log("res.status=" + res.status);
          if (res.status) {
            console.log(res);
            console.log("res data=" + res.data);
            console.log("addbooking result = " + res.data);
          }
        });
    }
    this._router.navigate(['/redirectBookinglist']);
  }
}
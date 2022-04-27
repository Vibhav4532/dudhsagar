import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bookingadd',
  templateUrl: './bookingadd.component.html',
  styleUrls: ['./bookingadd.component.css']
})
export class BookingAddComponent implements OnInit {
 
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _api: ApiService
  ) {
    
   }

  confirmClicked(): void {
    console.log("Inside Confirm click");
    // let { email,dateTime, seats } = req.body;
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      console.log(userDetails[0].UserEmail);
      var userEmail =  userDetails[0].UserEmail; 
      var dateTime  = "2022-04-27 15:40:00";// form.value.triptime;
      var seats = 4;
      this._api.postTypeRequest('user/addbooking', 
           { 'email': userEmail , 'dateTime':dateTime , 'seats':seats})
           .subscribe((res: any) => {
          console.log("res.status="+res.status);
            if (res.status) {
              console.log(res);
              console.log("res data="+res.data);
              console.log("addbooking result = " + res.data);
            }
      });
    }
  }

  // this._api.postTypeRequest('user/getbookings',
  //                                 { 'email': userEmail , 'Userrole': userRole })
  //       .subscribe((res: any) => {
  //         console.log("res.status="+res.status);

  cancelClicked(): void {
    console.log("Inside Cancel click");
    this._router.navigate(['/home']);
  }
      

  ngOnInit(): void { 
  }

}
// CREATE TABLE Bookings (
//   BookingId int(11) NOT NULL,
//  UserEmail  varchar(255) NOT NULL,
//  TransactionId int(11) NOT NULL,
//  `DateTime` DATETIME NOT NULL,
//  Seats int(11) NOT NULL,
//  Primary key (BookingId),
//  FOREIGN KEY (UserEmail) REFERENCES users(UserEmail)
//  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 
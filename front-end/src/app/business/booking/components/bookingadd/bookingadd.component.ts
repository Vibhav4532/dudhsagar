import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-bookingadd',
  templateUrl: './bookingadd.component.html',
  styleUrls: ['./bookingadd.component.css']
})

export class BookingAddComponent implements OnInit {
  numSeatsOptions: any = ['1', '2', '3', '4', '5', '6', '7'];

  static apiService: ApiService

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _api: ApiService
  ) { 
    BookingAddComponent.apiService = _api

  }

  ngOnInit(): void { 
     if (this._auth.getUserDetails() && this._auth.getUserDetails()!.length > 1){
    }
  }

 onSubmit(form: NgForm) {
    console.log("Inside Confirm click");
    var redirectPath = '/redirectBookinglist';
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      console.log("UserEmail=" + userDetails[0].UserEmail);
      var userEmail = userDetails[0].UserEmail;
      // Read https://www.concretepage.com/angular-2/angular-2-ngform-with-ngmodel-directive-example
      // for directions to extract the dateTime below.
      console.log("triptime=" + form.controls["triptime"].value);
      var dateTime = form.controls["triptime"].value;
      //console.log(form.value.seats);
      var seats = form.controls["seats"].value;
      this._api.postTypeRequest('book/addbooking', { 'email': userEmail, 'dateTime': dateTime, 'seats': seats })
        .subscribe((res: any) => {
          console.log("addbooking res.status=" + res.status);
          if (res.status) {
            console.log("addbooking result = " + res.data);
            var perSeatRate = 400;
            var paise = 100;
            var amount = seats * perSeatRate * paise;
            var bookingId = res.data.insertId;

            this._api.postTypeRequest('book/createOrder', { 'amount': amount, 'currency': "INR", 'receipt':  bookingId})
              .subscribe((res: any) => {
                console.log("createOrder res.status=" + res.status);
                if (res.status) {
                  console.log("Received orderId=" + res.data.order.id);

                  //Let's pay now
                  let finalObject = {
                    "userEmail": userEmail,
                    "bookingId": bookingId,
                    "amount": amount,
                    "key": res.data.key,
                    "orderId": res.data.order.id
                  }
                  sessionStorage.setItem("bookingObj", JSON.stringify(finalObject));

                  var razorPayOptions = {
                    "key": res.data.key, // Enter the Key ID generated from the Dashboard
                    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
                    "currency": "INR",
                    "name": "DudhSagar",
                    "description": "DudhSagar bill payment",
                    "order_id": res.data.order.id,
                    "image": "https://example.com/your_logo",
                    "handler": this.razorPayResponseHandler,
                    "notes": {
                      "address": "Thank you for booking with DudhSagar"
                    },
                    "theme": {
                      "color": "#8bf7a8"
                    }//,
                    //http_post:this.apiService
                  };

                  var rzp1 = new Razorpay(razorPayOptions);
                  rzp1.on('payment.failed', this.razorPayFailureHandler);
                  rzp1.open();


                  //redirectPath = '/redirectBookingadd';
                }
                console.log("redirectPath1="+redirectPath);
                this._router.navigate([redirectPath]);
              });
          }
        });
    }
  }

  razorPayResponseHandler(response: any) {
    //  console.log("final response",response);
    const bookingObj = sessionStorage.getItem('bookingObj');

    let sess = bookingObj ? JSON.parse(bookingObj) : "";
    console.log("storage ", sess);
    console.log("response.razorpay_payment_id=" + response.razorpay_payment_id);
    console.log("response.razorpay_order_id=" + response.razorpay_order_id);
    console.log("sess.orderId=" + sess.orderId);
    console.log("response.razorpay_signature=" + response.razorpay_signature);
    let paymentObject = {
      paymentId: response.razorpay_payment_id,
      //orderId:response.razorpay_order_id,
      signature: response.razorpay_payment_id,
      userEmail: sess.userEmail,
      bookingId: sess.bookingId,
      amount: sess.amount,
      key: sess.key,
      orderId: sess.orderId
    }
    console.log("payment object ", paymentObject)
    console.log("_api = "+this._api);

    BookingAddComponent.apiService.postTypeRequest('book/updatebooking', { 'paymentObject': paymentObject })
      .subscribe((res: any) => {
        if (res.status) {
          console.log("Update Booking Id " + sess.bookingId)
        } else {
          console.log("Update Booking Error " + sess.bookingId + res.error)
        }
        sessionStorage.removeItem('bookingObj')
      });
  }

  razorPayFailureHandler(response: any) {
    //  console.log("final response",response);
    const bookingObj = sessionStorage.getItem('bookingObj');

    let sess = bookingObj ? JSON.parse(bookingObj) : "";
    console.log("storage ", sess)
    let paymentObject = {
      paymentId: response.razorpay_payment_id,
      //orderId:response.razorpay_order_id,
      signature: response.razorpay_payment_id,
      userEmail: sess.userEmail,
      bookingId: sess.bookingId,
      amount: sess.amount,
      key: sess.key,
      orderId: sess.orderId

    }
    console.log("payment object ", paymentObject);
    console.log("_api = "+this._api);
    BookingAddComponent.apiService.postTypeRequest('book/deletebooking', { 'bookingId': sess.bookingId })
      .subscribe((res: any) => {
        if (res.status) {
          console.log("Delete Booking Id " + sess.bookingId)
        } else {
          console.log("Delete Booking Error " + sess.bookingId + res.error)
        }
        sessionStorage.removeItem('bookingObj')
      });
  }
  


}
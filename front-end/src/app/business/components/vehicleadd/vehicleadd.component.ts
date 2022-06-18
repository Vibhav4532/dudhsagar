import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Driver } from '../../driver';

@Component({
  selector: 'app-vehicleadd',
  templateUrl: './vehicleadd.component.html',
  styleUrls: ['./vehicleadd.component.css']
})
export class VehicleaddComponent implements OnInit {
  isLogin: boolean = false
  drivers: Driver[] = [];

  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();

    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      var userRole = userDetails[0].Userrole;
      if (userRole == 'ADMIN') {
        this._api.postTypeRequest('user/driverListForVehicleAdd', { 'UserRole': userRole })
          .subscribe((res: any) => {
            console.log("res.status=" + res.status);
            if (res.status) {
              console.log(res);
              console.log("res data=" + res.data);
              this.drivers = res.data;
              console.log(this.drivers);
            }
          });
      }
    } else {
      this._router.navigate(['/adminhome']);
    }

  }
  onSubmit(form: NgForm) {
    console.log("Called OnSubmit. Trying to Register...")
    this._api.postTypeRequest('user/vehicleadd', form.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res);
        this._router.navigate(['adminhome']);
      } else {
        console.log(res)
        alert(res.msg)
      }
    });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Driver } from '../../driver';

@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.css']
})
export class DriverlistComponent implements OnInit {

  drivers: Driver[] = [];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (this._auth.getUserDetails() && this._auth.getUserDetails()!.length > 1) {
      this.reloadData();
    }
    else {
      this._router.navigate(['/login']);
    }
  }

  reloadData() {
    /* Call the server only if the login was successful. */
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      var userRole = userDetails[0].Userrole;
      if (userRole == 'ADMIN') {
        this._api.postTypeRequest('user/driverlist', { 'UserRole': userRole })
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
}
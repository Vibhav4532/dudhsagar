import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vehicle } from 'vehicle';

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {
  vehicles: Vehicle[] = [];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {if (this._auth.getUserDetails() && this._auth.getUserDetails()!.length > 1)
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
      var userRole = userDetails[0].Userrole;
      if (userRole == 'ADMIN') {
        this._api.postTypeRequest('user/vehiclelist', { 'UserRole': userRole })
          .subscribe((res: any) => {
            console.log("res.status=" + res.status);
            if (res.status) {
              console.log(res);
              console.log("res data=" + res.data);
              this.vehicles = res.data;
              console.log(this.vehicles);
            }
          });
      }
    } else {
      this._router.navigate(['/login']);
    }
  }
}


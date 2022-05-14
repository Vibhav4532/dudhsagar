import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log("Called OnSubmit. Trying to Register...")
    this._api.postTypeRequest('user/vehicle', form.value).subscribe((res: any) => {
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


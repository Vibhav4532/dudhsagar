import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})

export class DriverComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    console.log("Called OnSubmit. Trying to Register...")
    this._api.postTypeRequest('user/driverregister', form.value).subscribe((res: any) => {
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




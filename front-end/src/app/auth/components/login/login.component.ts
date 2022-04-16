import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    console.log('Your form data : ', form.value);
    console.log('Your form uername : ', form.value.username);
    console.log('Your form pwd : ', form.value.password);
    if(form.value.username?.length== 0 || form.value.password?.length== 0) {
      this.isLogin = false;
      this.errorMessage = "Failed to login. Incorrect username or password";
      return;
    }

    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      console.log("res.status="+res.status);
      if (res.status) {

        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
      } else {
        this.isLogin = false;
        this.errorMessage = "Failed to login. Incorrect username or password";
      }
    }, err => {
        this.isLogin = false;
        this.errorMessage = "Failed to login. Incorrect username or password. err="+err.message;
    })
  }
  isUserLogin() {
    console.log("userdetails"+this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  logout() {
    this._auth.clearStorage()
    this._router.navigate(['']);
  }
}

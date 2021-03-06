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
    // console.log('Your form uername : ', form.value.username);
    // console.log('Your form pwd : ', form.value.password);
    if (form.value.username?.length == 0 || form.value.password?.length == 0) {
      this.isLogin = false;
      this.errorMessage = "Failed to login. Empty username or password";
      return;
    }

    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      console.log("res.status=" + res.status);
      if (res.status) {
        this.isLogin = true;
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        console.log(res.data[0].Userrole);
        this._auth.setDataInLocalStorage('token', res.token);
        if (res.data[0].Userrole == 'ADMIN') {
          this._router.navigate(['/adminhome']);
        } else {
          this._router.navigate(['/home']);
        }
        this._auth.afterlogin(form.value.username);
        this.errorMessage='';
      } else {
        this._auth.afterlogout();
        this.isLogin = false;
        this.errorMessage = "Failed to login. Incorrect username or password";
      }
    }, err => {
      this._auth.afterlogout();
      this.isLogin = false;
      this.errorMessage = "Failed to login. Incorrect username or password.";
    })
  }
  isUserLogin() {
    console.log("userdetails" + this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
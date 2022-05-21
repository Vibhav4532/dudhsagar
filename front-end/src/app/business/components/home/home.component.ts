import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isLogin: boolean = false

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
    _auth.getLoggedInName.subscribe(name => {
      if (name == 'SignIn') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }
  ngOnInit() {
    this.isUserLogin();

    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      let userDetailsJsonObject = this._auth.getUserDetails();
      var userDetails = JSON.parse(userDetailsJsonObject!);
      var userRole = userDetails[0].Userrole;
      if (userRole == 'ADMIN') {
        this._router.navigate(['adminhome']);
      }
    }
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







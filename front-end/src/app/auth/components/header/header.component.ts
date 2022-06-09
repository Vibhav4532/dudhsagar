import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false
  userName: string = ""

  private changeName(name: string): void {
    this.userName = name;
  }

  constructor(
    //private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {

    _auth.getLoggedInName.subscribe(name => {
      if (name == 'SignIn') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        this.changeName(this.getName())
      }

    });
  }

  getName() {
    let userDetailsJsonObject = this._auth.getUserDetails();
    var userDetails = JSON.parse(userDetailsJsonObject!);
    console.log(userDetails[0].Username);
    var username = userDetails[0].Username;
    return username;
  }


  ngOnInit() {
    if(this.isUserLogin()) {
      this.changeName(this.getName());
    }
  }

  isUserLogin() {
    console.log("userdetails=" + this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null && this._auth.getUserDetails()!.length > 1) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  logout() {
    console.log("Logout called");
    this._auth.clearStorage();
    this._auth.afterlogout();
    this.isLogin = false;
    this._router.navigate(['/base']);
  }

}
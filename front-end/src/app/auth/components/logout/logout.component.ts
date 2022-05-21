import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.logout();
  }
  logout() {
    this._auth.clearStorage();
    this._auth.afterlogout();
    this._router.navigate(['/home']);
  }
}


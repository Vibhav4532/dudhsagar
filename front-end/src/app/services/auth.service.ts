import { EventEmitter, Injectable, Output } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor() { }

  getUserDetails() {
    console.log("userdata in getUserDetails="+localStorage.getItem('userData')?.length);
    if (localStorage.getItem('userData') && localStorage.getItem('userData')!.length > 2) {
      return localStorage.getItem('userData')
    } else {
      return null
    }

  }
  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
  }

  afterlogin(name: string) {
    this.getLoggedInName.emit(name);
  }
  afterlogout() {
    this.getLoggedInName.emit("SignIn");
  }
}
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}
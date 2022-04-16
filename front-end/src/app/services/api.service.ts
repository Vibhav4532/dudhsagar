import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl = 'http://localhost:4000/';
    constructor(private _http: HttpClient) {
    }
    getTypeRequest(url: string) {
        return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
            return res;
        }));
    }
    postTypeRequest(url: string, payload: any) {
        return this._http.post(`${this.baseUrl}${url}`, payload).pipe(
            map(res => {
            return res;
        }), catchError(
            (err) => {
                console.log('error caught in apiservice')
                console.error(err);
                //Handle the error here
                return throwError(err);    //Rethrow it back to component
              }
        ));
    }
    putTypeRequest(url: string, payload: any) {
        return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
            return res;
        }));
    }
}

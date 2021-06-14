import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'api/Customers/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  ToLogin(login: Login): Observable<Login>{
    const url = `${this.loginUrl}VerifyPassword/`;
    return this.http.post<Login>(url, login, this.httpOptions)
      .pipe(tap(_ => console.log('Verifying password')))
  }
}

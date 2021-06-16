import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'api/Customers/';
  public bearerToken: string

  constructor(private http: HttpClient) { }

  httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   
  }


/*
  ToLogin(login: Login): Observable<string>{
    const url = `${this.loginUrl}VerifyPassword/`;
    return this.http.post<string>(url, login, this.httpOptionsJson)
      .pipe(tap(_ => console.log('Verifying password')))
  }
*/
  

  ToLogin(email: string, password: string){
    const url = `${this.loginUrl}VerifyPassword/?email=${email}&password=${password}`;
    console.log(this.http.get<Login>(url));
    
    return this.http.get<string>(url)
      
  } 
}

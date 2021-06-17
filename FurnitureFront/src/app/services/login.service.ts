import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, finalize,  } from 'rxjs/operators';
import { Login, ClassLogin } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'api/Customers/';

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
  
  //Man kan bruge console.log til at skrive værdien i en observable 
  ToLogin(email: string, password: string): Observable<Login>{
    const url = `${this.loginUrl}VerifyPassword/?email=${email}&password=${password}`;
    
    return this.http.get<Login>(url)
      .pipe(
      tap( res => console.log('HTTP response:', res)),
      finalize(() => console.log())
      )
      
  } 

  
}
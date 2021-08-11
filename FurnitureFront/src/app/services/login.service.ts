import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, finalize, } from 'rxjs/operators';
import { Login, ClassLogin } from '../models/login';
import { BearertokenService } from '../services/bearertoken.service'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'api/Customers/';

  constructor(
    private http: HttpClient,
    cookie: CookieService,
    private bearerTokenService: BearertokenService
    ) { }

  httpOptionsJson = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    }),
  }

  //Man kan bruge console.log til at skrive værdien i en observable 
  //Tap for at kunne se hvornår og hvor hurtigt vi får respons
  ToLogin(email: string, password: string): Observable<Login> {
    const url = `${this.loginUrl}VerifyPassword/?email=${email}&password=${password}`;
    return this.http.get<Login>(url, this.httpOptionsJson)
      .pipe(
        tap(res => console.log('HTTP response:', res)),
    
      )

  }


}
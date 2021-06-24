import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { stringify } from 'querystring';
import { decode } from 'punycode';
import { BearerTokenInfo } from '../models/bearertokeninfo';


@Injectable({
  providedIn: 'root'
})
export class BearertokenService {
  decode: string;  
  bearerTokenInfo: BearerTokenInfo
  constructor(private cookie: CookieService) { }

  SetBearertoken(bearerToken: string)
  {
    this.cookie.set("bearertoken", bearerToken);
  }

  GetBearertoken() {
    var existing: any = this.cookie.get("bearertoken");

    if (existing == null)
    {
      console.log("No bearerToken");
      
      return existing;
    }
    else
    {
      console.log(`returned with token ${existing}`);
      
      return existing;
    }
  }

  DecodeBearerToken(){
    var bearerToken = this.GetBearertoken();
    if (bearerToken == ""){
      return null;
    }

    this.decode = JSON.stringify(jwt_decode(bearerToken));
 
    this.bearerTokenInfo = JSON.parse(this.decode); 

    return(this.bearerTokenInfo);
  }

  //TODO REFRESH BEARER TOKEN
  
}

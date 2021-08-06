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
  bearerTokenInfo: BearerTokenInfo;
  loginInfo: BearerTokenInfo;
  constructor(private cookie: CookieService) { }

  //for at sætte bearertoken
  SetBearertoken(bearerToken: string)
  {
    this.cookie.set("bearertoken", bearerToken);
  }

  //for at kunne få fat i den token der ligger gemt i cookies
  GetBearertoken() {
    var existing: any = this.cookie.get("bearertoken");

    if (existing == null)
    {
      console.log("No bearerToken");
      
      return existing;
    }
    else
    {
      //console.log(`returned with token ${existing}`);
      
      return existing;
    }
  }

  //Dette er for at vi kan decode den hash vi for tilsendt, Vi verificere den ikke på front end så front end ved ikke om den er korrekt
  DecodeBearerToken(){
    var bearerToken = this.GetBearertoken();
    if (bearerToken == ""){
      return null;
    }

    this.decode = JSON.stringify(jwt_decode(bearerToken));
 
    this.bearerTokenInfo = JSON.parse(this.decode); 

    return(this.bearerTokenInfo);
  }

  //Vi checker for at man er logget ind og så returne vi den information der burde ligge til rådighed
  CheckLoginInfo(){
    this.loginInfo = this.DecodeBearerToken();
    if(this.loginInfo == null){
      console.log("NOT LOGGED IN");
      
    }
    else{
      console.log("LOGGED IN");
      return this.loginInfo;
    }
  }

  //TODO REFRESH BEARER TOKEN
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BearertokenService {

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
}

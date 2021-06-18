import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators';
import { BearertokenService } from './services/bearertoken.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{    
    constructor(private bearertokenService: BearertokenService){
        
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{        
        const authToken = this.bearertokenService.GetBearertoken();
        console.log(authToken);
        
        request = request.clone({
            setHeaders: {     
                Authorization: `Bearer ${authToken}`, 
            }
        })
        console.log(request.headers);
        
        return next.handle(request)
        

        /*.pipe
        (filter(event => event instanceof HttpResponse),
        (tap((event: HttpResponse<any>) => {
            request.urlWithParams   
        })
        ));*/
    }
}
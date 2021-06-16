import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        
        request = request.clone({
            setHeaders: {                
                Authorization: `Bearer ${request.body}`, 
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
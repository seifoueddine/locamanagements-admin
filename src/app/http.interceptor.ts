import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class XhrInterceptor implements HttpInterceptor {
    slugId: any;

    constructor() {
     }

    intercept(request: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');
        const accessToken = localStorage.getItem('accessToken');
       
     
        request = request.clone({headers: request.headers.set('uid', `${uid}` )});
        request = request.clone({headers: request.headers.set('client', `${client}` )});
        request = request.clone({headers: request.headers.set('access-token', `${accessToken}` )});
        return next.handle(request);
    }
}

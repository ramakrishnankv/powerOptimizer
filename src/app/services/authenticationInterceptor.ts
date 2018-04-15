import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(  ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });

        return next.handle(req);
    }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
      ) {}
      
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.tokenService.getToken()
    req = req.clone({
      setHeaders: {
        // 'Content-Type' : 'application/json; charset=utf-8',
        // 'Accept'       : 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return next.handle(req);
  }
}
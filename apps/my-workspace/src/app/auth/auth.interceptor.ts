import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    // Clone request and add Authorization header if token exists
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // to handle 401 Unauthorized errors
        if (error.status === 401) {
          this.authService.clearToken();
          alert('Session expired. Please log in again.');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}

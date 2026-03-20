import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = error.error.message;
        } else {
          // Server-side error
          errorMsg = error.error?.message || `Error Code: ${error.status}, Message: ${error.message}`;
        }

        if (error.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        this.alertService.error(errorMsg);
        return throwError(() => errorMsg);
      })
    );
  }
}

export const errorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
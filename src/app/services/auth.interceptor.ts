import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    durationInSeconds = 5;
    constructor(private router:Router,private _snackBar: MatSnackBar){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('currentUser');
        if (token) {
            token = token.replace(/^"(.*)"$/, '$1');
        }

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(catchError (err => {

          if (err.status == 403) {
            console.log(err.status);

            sessionStorage.removeItem('currentUser');
            this._snackBar.open('Session Expired !!','', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
              panelClass: ['snackbar']
            });
            this.router.navigate(['/login']);
          }
          return throwError(err);
      }))
    }
}

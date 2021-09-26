import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let modifiedReq = req
        // if (sessionStorage.getItem('currentUser')) {
        //     //console.log('With Token --- ' + sessionStorage.getItem('token'));
        //     modifiedReq = req.clone({
        //         setHeaders: {
        //             Authorization: "Bearer "+sessionStorage.getItem('currentUser')
        //           }
        //     });
        // }
        // return next.handle(modifiedReq);




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
        console.log("............");
        return next.handle(request);
    }
}

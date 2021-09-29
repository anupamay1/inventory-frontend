import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  login(user:User):Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`,user,{ responseType: 'text' })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("usrr",user);
            sessionStorage.setItem('currentUser', user);
            return user;
        }));
}

logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('currentUser');
}

saveUser(user: User): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/addUser`,user)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("usrr",user);
            this.login(user);
            return user;
        }));
}

}

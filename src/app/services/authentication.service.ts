import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:4000/users/signin', { username, password })
        .pipe(map(res => {
            // login successful if there's a jwt token in the response
            if (res.user && res.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                this.currentUserSubject.next(res.user);
            }

            return res.user;
        }));
  }

  getDoctors(speciality,apikey){
    return this.http.post<any>('http://localhost:4000/users/doctors', {  apikey,speciality })
    .pipe(map(res => {
      return res;
  }));
  }

  saveAppointment(appointment,apikey){
    return this.http.post<any>('http://localhost:4000/newAppointment', {appointment,apikey})
    .pipe(map(res => {
      return res;
  }));
  }

  searchAppointment(appointment,apikey){
    return this.http.post<any>('http://localhost:4000/statusCheck', {appointment,apikey})
    .pipe(map(res => {
      return res;
  }));
  }

  consultAppointment(appointment,apikey){
    return this.http.post<any>('http://localhost:4000/consult', {appointment,apikey})
    .pipe(map(res => {
      return res;
  }));
  }

  updateAppointment(appointment,apikey){
    return this.http.post<any>('http://localhost:4000/updateStatus', {appointment,apikey})
    .pipe(map(res => {
      return res;
  }));
  }

  retriveHistory(appointment,apikey){
    return this.http.post<any>('http://localhost:4000/history', {appointment,apikey})
    .pipe(map(res => {
      return res;
  }));
  }



logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}

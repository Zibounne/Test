import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignInPayload } from '../../interfaces/user/signIn/sign-in-payload';
import { SignUpPayload } from '../../interfaces/user/signUp/sign-up-payload';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  /////////////////////// Property ////////////////////////

  private apiUrl = "http://localhost:3000/api/user";
  
  ////////////////////// Constructor //////////////////////

  constructor(private http: HttpClient) {}

  //////////////////////// Methods ////////////////////////

  // Sign Up
  signUp(payload: SignUpPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/signUp`, payload);
  }

  // Sign In
  signIn(payload: SignInPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/signIn`, payload);
  }

}
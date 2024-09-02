import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user/user';

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
  signUp(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

}
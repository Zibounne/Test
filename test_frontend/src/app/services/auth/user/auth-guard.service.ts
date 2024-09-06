import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/signIn']);
      return false;
    }
  }  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
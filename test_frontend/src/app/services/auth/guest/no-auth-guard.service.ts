import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }  

}
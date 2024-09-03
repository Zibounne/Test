import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
})

export class SignOutComponent {

  /////////////////////// Property ////////////////////////

  errorMessage: string | null = null;

  ////////////////////// Constructor //////////////////////
 
  constructor
  (
    private userService: UserService,
    private router: Router
  ) { }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.signOut();
  }

  // Sign Out
  signOut(): void {
    this.userService.signOut().subscribe({
      next: (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/signIn']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to sign out. ' + error.message;
      }
    });
  }

}
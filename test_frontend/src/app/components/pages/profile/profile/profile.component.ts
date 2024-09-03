import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';
import { ProfilePayload } from '../../../../interfaces/user/profile/profile-payload';
import { UserService } from '../../../../services/user/user.service';
import { AuthGuardService } from '../../../../services/auth/auth-guard.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
})

export class ProfileComponent {

  /////////////////////// Property ////////////////////////

  user: ProfilePayload | null = null;
  errorMessage: string | null = null;

  ////////////////////// Constructor //////////////////////

  constructor
  (
    private titleService: Title,
    private userService: UserService,
    private authService: AuthGuardService
  
  ) { }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Test | Profile");
    this.loadUserProfile();
  }

  // Load user profile
  private loadUserProfile(): void {

    const token = this.authService.getToken();
    
    if (!token) {
      this.errorMessage = 'User not authenticated.';
      return;
    }

    this.userService.getProfile(token).subscribe({
      next: (response: ProfilePayload) => {
        this.user = response;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load profile. ' + error.message;
      }
    });

  }

}
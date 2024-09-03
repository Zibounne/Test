import { Routes } from '@angular/router';

import { AuthGuardService } from './services/auth/user/auth-guard.service';
import { NoAuthGuardService } from './services/auth/guest/no-auth-guard.service';

import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { SignOutComponent } from './components/auth/sign-out/sign-out.component';

export const routes: Routes = [
    // Public routes
    { path: '', component: HomeComponent },
    
    // Non-authenticated routes
    { path: 'signIn', component: SignInComponent, canActivate: [NoAuthGuardService] },
    { path: 'signUp', component: SignUpComponent, canActivate: [NoAuthGuardService] },

    // Authenticated routes
    { path: 'signOut', component: SignOutComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

    // Fallback route
    { path: '**', component: HomeComponent },
];
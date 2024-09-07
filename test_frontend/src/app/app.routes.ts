import { Routes } from '@angular/router';

import { AuthGuardService } from './services/auth/user/auth-guard.service';
import { NoAuthGuardService } from './services/auth/guest/no-auth-guard.service';

import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/auth/sign-up/sign-up.component';
import { SignOutComponent } from './components/pages/auth/sign-out/sign-out.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { CategoryComponent } from './components/pages/articles/category/category.component';

export const routes: Routes = [
    // Public routes
    
    
    // Non-authenticated routes
    { path: 'welcome', component: WelcomeComponent, canActivate: [NoAuthGuardService] },
    { path: 'signIn', component: SignInComponent, canActivate: [NoAuthGuardService] },
    { path: 'signUp', component: SignUpComponent, canActivate: [NoAuthGuardService] },

    // Authenticated routes
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'signOut', component: SignOutComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'articles', component: CategoryComponent, canActivate: [AuthGuardService] },

    // Fallback route
    { path: '**', component: HomeComponent },
];
import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { SignOutComponent } from './components/auth/sign-out/sign-out.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'signOut', component: SignOutComponent },
    { path: 'profile', component: ProfileComponent },

    // Other routes
    { path: '**', component: HomeComponent },
];
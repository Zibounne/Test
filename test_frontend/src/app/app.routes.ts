import { Routes } from '@angular/router';

import { AuthGuardService } from './services/auth/user/auth-guard.service';
import { NoAuthGuardService } from './services/auth/guest/no-auth-guard.service';

import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/auth/sign-up/sign-up.component';
import { SignOutComponent } from './components/pages/auth/sign-out/sign-out.component';
import { ProfileComponent } from './components/pages/profile/profile/profile.component';
import { CategoryListComponent } from './components/pages/articles/category-list/category-list.component';
import { CategoryFormComponent } from './components/pages/articles/category-form/category-form.component';
import { CategoryEditComponent } from './components/pages/articles/category-edit/category-edit.component';

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
    { path: 'categoryList', component: CategoryListComponent, canActivate: [AuthGuardService] },
    { path: 'categoryForm', component: CategoryFormComponent, canActivate: [AuthGuardService] },
    { path: 'categoryEdit/:id', component: CategoryEditComponent, canActivate: [AuthGuardService] },

    // Fallback route
    { path: '**', component: HomeComponent },
];
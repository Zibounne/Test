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
import { ArticleFormComponent } from './components/pages/articles/article-form/article-form.component';
import { ArticleListComponent } from './components/pages/articles/article-list/article-list.component';
import { ArticleShowComponent } from './components/pages/articles/article-show/article-show.component';

export const routes: Routes = [
    ///////////////////////// Public routes /////////////////////////

    
    //////////////////// Non-authenticated routes ///////////////////

    // Welcome
    { path: 'welcome', component: WelcomeComponent, canActivate: [NoAuthGuardService] },
    // Sign
    { path: 'signIn', component: SignInComponent, canActivate: [NoAuthGuardService] },
    { path: 'signUp', component: SignUpComponent, canActivate: [NoAuthGuardService] },

    //////////////////// Authenticated routes ///////////////////

    // Home
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    // Sign
    { path: 'signOut', component: SignOutComponent, canActivate: [AuthGuardService] },
    // Profile
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    // Categories
    { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuardService] },
    { path: 'categoryForm', component: CategoryFormComponent, canActivate: [AuthGuardService] },
    { path: 'categoryEdit/:id', component: CategoryEditComponent, canActivate: [AuthGuardService] },
    { path: 'categories/:id', component: ArticleListComponent, canActivate: [AuthGuardService] },
    // Articles
    { path: 'articleForm', component: ArticleFormComponent, canActivate: [AuthGuardService] },
    { path: 'categories/:categoryId-:categorySlug/article/:articleId-:articleSlug', component: ArticleShowComponent, canActivate: [AuthGuardService] },
    
    ///////////////////////// Other routes /////////////////////////

    // Fallback route
    { path: '**', component: HomeComponent },
];
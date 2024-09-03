import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';

import { UserService } from '../../../services/user/user.service';

import { SignUpPayload } from '../../../interfaces/user/signUp/sign-up-payload';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sign-up.component.html',
})

export class SignUpComponent {

  /////////////////////// Property ////////////////////////

  successMessage: string | null = null;
  errorMessage: string | null = null;
  signUpForm: FormGroup;

  ////////////////////// Constructor //////////////////////
  
  constructor
  (
    private titleService: Title,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  )
  {
    this.signUpForm = this.fb.group
    ({
    username: ['',
    [
      Validators.required, 
      Validators.minLength(3)
    ]],
    email: ['',
    [
      Validators.required,
      Validators.email
    ]],
    password: ['',
    [
      Validators.required,
      Validators.minLength(6)
    ]],
    confirmPassword: ['', 
    [
      Validators.required,
      Validators.minLength(6)
    ]],
    firstname: [''],
    lastname: ['']
    });
  }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Test | Sign Up");
  }

  // Method | Sign Up
  signUp() {

    if (this.signUpForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      return;
    }

    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const payload: SignUpPayload = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword,
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname
    };

    this.userService.signUp(payload).subscribe({
      next: (response) => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = null;
        this.signUpForm.reset();
        setTimeout(() => {
          this.router.navigate(['/signIn']);
        }, 2000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Username or email already used';
        } else {
          this.errorMessage = 'An error occurred ! ' + error.error.message;
        }
        this.successMessage = null;
      },
      complete: () => {
        console.log('User registration completed.');
      }
    });   

  }

}
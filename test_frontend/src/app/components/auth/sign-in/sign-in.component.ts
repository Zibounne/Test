import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';

import { UserService } from '../../../services/user/user.service';
import { SignInPayload } from '../../../interfaces/user/signIn/sign-in-payload';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sign-in.component.html',
})

export class SignInComponent {

  /////////////////////// Property ////////////////////////

  signInForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ////////////////////// Constructor //////////////////////

  constructor
  (
    private titleService: Title,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  )
  {
    this.signInForm = this.fb.group
    ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Test | Sign In");
  }

  // Method | Sign In
  signIn() {

    if (this.signInForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      return;
    }

    const { email, password } = this.signInForm.value;
    const payload: SignInPayload = { email, password };

    this.userService.signIn(payload).subscribe({
      next: (response) => {
        this.successMessage = "Sign In successful !";
        this.errorMessage = null;
        localStorage.setItem('token', response.token);
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred!';
        this.successMessage = null;
      }
    });

  }

}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './category-form.component.html',
})

export class CategoryFormComponent {

  categoryForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor
  (
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  )
  {
    this.categoryForm = this.fb.group
    ({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | CategoryForm");
  }

  submitCategory() {
    if (this.categoryForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      this.successMessage = null;
      return;
    }

    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: (response) => {
        this.successMessage = "Category created successfully!";
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/categoryList']), 2000);
      },
      error: (error) => {
        this.errorMessage = "Failed to create category. Please try again.";
        this.successMessage = null;
      }
    });
  }

}
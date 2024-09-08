import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../../services/category/category.service';

import { CategoryEditPayload } from '../../../../interfaces/category/category-edit/category-edit';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './category-edit.component.html',
})

export class CategoryEditComponent implements OnInit {

  /////////////////////// Property ////////////////////////

  categoryForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  categoryId: string = '';

  ////////////////////// Constructor //////////////////////

  constructor
  (
    private titleService: Title,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  )
  {
    this.categoryForm = this.fb.group
    ({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Category Edit");
    this.categoryId = this.route.snapshot.paramMap.get('id')!; // Get categoryId from route params
    this.loadCategory(); // Load category details
  }

  // Load category
  loadCategory(): void {
    this.categoryService.findById(this.categoryId).subscribe({
      next: (category: CategoryEditPayload) => {
        this.categoryForm.patchValue({
          title: category.title,
          description: category.description
        });
      },
      error: () => this.errorMessage = 'Failed to load category.'
    });
  }

  // Submit category
  submitCategory(): void {
    if (this.categoryForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const payloadEdit: CategoryEditPayload = {
      title: this.categoryForm.value.title,
      description: this.categoryForm.value.description,
    };


    this.categoryService.updateCategory(this.categoryId, payloadEdit).subscribe({
      next: () => {
        this.successMessage = 'Category updated successfully.';
        this.router.navigate(['/categories']);
      },
      error: () => this.errorMessage = 'Failed to update category.'
    });
  }

}
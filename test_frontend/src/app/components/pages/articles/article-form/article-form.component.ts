import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

import { ArticleService } from '../../../../services/article/article.service';
import { CategoryService } from '../../../../services/category/category.service';

import { EditorModule } from '@tinymce/tinymce-angular';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    EditorModule
  ],
  templateUrl: './article-form.component.html',
})

export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;
  categories: any[] = [];
  selectedCategories: Set<number> = new Set<number>();
  errorMessage: string | null = null;
  successMessage: string | null = null;
  tinymceApiKey = environment.tinymceApiKey;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
      categoryIds: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Blog | ArticleForm");
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.findAll().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: () => {
        this.errorMessage = "Failed to load categories. Please try again.";
      }
    });
  }

  toggleCategory(categoryId: number) {
    if (this.selectedCategories.has(categoryId)) {
      this.selectedCategories.delete(categoryId);
    } else {
      this.selectedCategories.add(categoryId);
    }
    this.articleForm.get('categoryIds')?.setValue(Array.from(this.selectedCategories));
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategories.has(categoryId);
  }

  submitArticle() {
    if (this.articleForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      this.successMessage = null;
      return;
    }

    this.articleService.createArticle(this.articleForm.value).subscribe({
      next: () => {
        this.successMessage = "Article created successfully!";
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/categories']), 2000);
      },
      error: () => {
        this.errorMessage = "Failed to create article. Please try again.";
        this.successMessage = null;
      }
    });
  }
}
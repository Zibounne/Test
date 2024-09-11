import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

import { ArticleService } from '../../../../services/article/article.service';

import { EditorModule } from '@tinymce/tinymce-angular';

import { environment } from '../../../../../environments/environment';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    EditorModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './article-show.component.html',
})

export class ArticleShowComponent implements OnInit {
  article: any = {};
  category: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  editingMode: boolean = false;
  articleForm!: FormGroup;
  tinymceApiKey = environment.tinymceApiKey;
  safeDescription: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryIdString = params['categoryId-:categorySlug'];
      const articleIdString = params['articleId-:articleSlug'];

      if (categoryIdString && articleIdString) {
        const categoryId = parseInt(categoryIdString.split('-')[0], 10);
        const articleId = parseInt(articleIdString.split('-')[0], 10);

        if (!isNaN(categoryId) && !isNaN(articleId)) {
          this.loadArticle(articleId);
          this.loadCategory(categoryId);
        } else {
          this.errorMessage = "Invalid category or article ID.";
        }
      } else {
        this.errorMessage = "Category or article ID is missing in route.";
      }

      this.articleForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(100)]],
      });
    });
  }

  loadArticle(articleId: number): void {
    this.articleService.getArticleById(articleId).subscribe({
      next: (response) => {
        this.article = response;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(response.description);

        this.articleForm.patchValue({
          title: this.article.title,
          description: this.article.description
        });
      },
      error: (error) => {
        this.errorMessage = "Failed to load article. Please try again.";
        console.error('Error loading article:', error);
      }
    });
  }

  loadCategory(categoryId: number): void {
    this.articleService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        this.category = response;
        console.log('Category Loaded:', this.category);
      },
      error: (error) => {
        this.errorMessage = "Failed to load category. Please try again.";
        console.error('Error loading category:', error);
      }
    });
  }

  deleteArticle(): void {
    if (confirm("Are you sure you want to delete this article?")) {
      this.articleService.deleteArticleById(this.article.id).subscribe({
        next: () => {
          console.log('Article deleted successfully');
          this.router.navigate(['/categories', this.category.id + '-' + this.category.title]);
        },
        error: (error) => {
          this.errorMessage = "Failed to delete the article. Please try again.";
          console.error('Error deleting article:', error);
        }
      });
    }
  }

  editArticle(): void {
    this.editingMode = true;
  }

  updateArticle(): void {
    if (this.articleForm.valid) {
      const updatedArticle = this.articleForm.value;
      this.articleService.updateArticle(this.article.id, updatedArticle).subscribe({
        next: () => {
          this.successMessage = "Article edited successfully !";
          this.errorMessage = null;

          setTimeout(() => {
            this.loadArticle(this.article.id);
            this.successMessage = null;
            this.editingMode = false;
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = "Failed to update the article. Please try again.";
          console.error('Error updating article:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingMode = false;
  }
}
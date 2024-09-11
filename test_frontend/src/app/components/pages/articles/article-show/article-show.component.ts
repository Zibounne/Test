import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

import { ArticleService } from '../../../../services/article/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './article-show.component.html',
})

export class ArticleShowComponent implements OnInit {
  article: any = {};
  category: any = {};
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
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
    });
  }  

  loadArticle(articleId: number): void {
    this.articleService.getArticleById(articleId).subscribe({
      next: (response) => {
        this.article = response;
        console.log('Article Loaded:', this.article);
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
  
}
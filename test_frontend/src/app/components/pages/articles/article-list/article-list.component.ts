import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArticleService } from '../../../../services/article/article.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

import { TruncatePipe } from '../../../../pipes/truncate/truncate.pipe';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    TruncatePipe
  ],
  templateUrl: './article-list.component.html',
})

export class ArticleListComponent implements OnInit {

  articles: any[] = [];
  category: any = {};
  categoryId: number = 0;
  errorMessage: string | null = null;

  constructor
  (
    private titleService: Title,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Articles");
    this.route.params.subscribe(params => {
      const idAndSlug = params['id'];
      this.categoryId = +idAndSlug.split('-')[0];
      this.loadCategory();
      this.loadArticles();
    });
  }

  // Charger les détails de la catégorie
  loadCategory(): void {
    this.articleService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.category = response;
      },
      error: (error) => {
        this.errorMessage = "Failed to load category. Please try again.";
      }
    });
  }

  // Charger les articles par ID de catégorie
  loadArticles(): void {
    this.articleService.getArticlesByCategory(this.categoryId).subscribe({
      next: (response) => {
        this.articles = response;
      },
      error: (error) => {
        this.errorMessage = "Failed to load articles. Please try again.";
      }
    });
  }

  // Slug
  slug(text: string): string {
    return text.replace(/\s+/g, '-').toLowerCase();
  }

  // Slug category & article
  getArticleLink(categories: any, article: any): string[] {
    return [
      '/categories', 
      `${categories.id}-${this.slug(categories.title)}`, 
      'article', 
      `${article.id}-${this.slug(article.title)}`
    ];
  }

}
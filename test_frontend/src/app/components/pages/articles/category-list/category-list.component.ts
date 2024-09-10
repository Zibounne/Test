import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../../partials/header/header.component';
import { FooterComponent } from '../../../partials/footer/footer.component';

import { CategoryService } from '../../../../services/category/category.service';

import { CategoryListPayload } from '../../../../interfaces/category/category-list/category-list';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './category-list.component.html',
})

export class CategoryListComponent implements OnInit {

  /////////////////////// Property ////////////////////////

  categories: CategoryListPayload[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  ////////////////////// Constructor //////////////////////

  constructor(
    private titleService: Title,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Categories");
    this.loadCategories();
  }

  // Load categories
  loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (categories: CategoryListPayload[]) => {
        this.categories = categories;
        console.log('Categories loaded successfully', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.errorMessage = 'Failed to load categories. Please try again later.';
      },
      complete: () => {
        console.log('Category loading completed.');
      }
    });
  }

  // Delete category
  deleteCategory(event: MouseEvent, categoryId: string): void {
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.successMessage = 'Category deleted successfully.';
          this.loadCategories();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete category.';
        }
      });
    }
  }

  // Edit category
  editCategory(categoryId: string): void {
    this.router.navigate(['/categoryEdit', categoryId]);
  }

  // Slug
  slug(text: string): string {
    return text.replace(/\s+/g, '-').toLowerCase();
  }
  
  // Slug category
  getCategoryLink(category: any): string[] {
    return [
      '/categories', 
      `${category.id}-${this.slug(category.title)}`
    ];
  }
  
}
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  

}
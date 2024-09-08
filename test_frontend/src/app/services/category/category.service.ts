import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryListPayload } from '../../interfaces/category/category-list/category-list';
import { CategoryFormPayload } from '../../interfaces/category/category-form/category-form';
import { CategoryEditPayload } from '../../interfaces/category/category-edit/category-edit';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  /////////////////////// Property ////////////////////////

  private apiUrl = "http://localhost:3000/api/categories";
  
  ////////////////////// Constructor //////////////////////

  constructor(private http: HttpClient) {}

  //////////////////////// Methods ////////////////////////

  // Find all categories
  findAll(): Observable<CategoryListPayload[]> {
    return this.http.get<CategoryListPayload[]>(this.apiUrl);
  }

  // Create a new category
  createCategory(categoryData: { title: string; description: string }): Observable<CategoryFormPayload> {
    return this.http.post<CategoryFormPayload>(this.apiUrl, categoryData);
  }

  // Delete a category
  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }

  // Find by id category
  findById(id: string): Observable<CategoryListPayload> {
    return this.http.get<CategoryListPayload>(`${this.apiUrl}/${id}`);
  }
  
  // Update a category
  updateCategory(id: string, categoryData: CategoryEditPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, categoryData);
  }

}
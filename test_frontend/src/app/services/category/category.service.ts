import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryListPayload } from '../../interfaces/category/category-list/category-list';
import { CategoryFormPayload } from '../../interfaces/category/category-form/category-form';

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

}
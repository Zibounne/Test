import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleFormPayload } from '../../interfaces/article/article-form/article-form';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  /////////////////////// Property ////////////////////////

  private apiUrl = "http://localhost:3000/api";
  
  ////////////////////// Constructor //////////////////////

  constructor(private http: HttpClient) {}

  //////////////////////// Methods ////////////////////////

  // Create a new article
  createArticle(articleData: ArticleFormPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/articles`, articleData);
  }

  // Find articles by category
  getArticlesByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}/articles`);
  }

  // Category detail by ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${categoryId}`);
  }

  // Article detail by ID
  getArticleById(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${articleId}`);
  }

  // Article delete
  deleteArticleById(articleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${articleId}`);
  }

  // Update article
  updateArticle(articleId: number, articleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/articles/${articleId}`, articleData);
  }

}
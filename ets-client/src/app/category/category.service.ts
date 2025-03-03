// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: category.service.ts
// Date: 15 February 2025
// Description: exporting category API

import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddCategoryDTO, UpdateCategoryDTO } from './category'; // importing AddCategoryDTO

@Injectable({
  providedIn: 'root'
})
// Creating functions to call the Category API
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories/list`);
  }

  searchExpenses(query: string) {
    return this.http.get(`/api/categories/list?q=${query}`);
  }


  // addCategory method to use the AddCategoryDTO object
  addCategory(category: AddCategoryDTO) {
    return this.http.post<Category>(`${environment.apiBaseUrl}/api/categories`, category);
  }

  // getCategory by Id
  getCategory(categoryId: string) {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${categoryId}`);
  }

  // deleteCategory
  deleteCategory(categoryId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/categories/${categoryId}`);
  }

  // updateCategory
  updateCategory(category: UpdateCategoryDTO, categoryId: number) {
    return this.http.patch<Category>(`${environment.apiBaseUrl}/api/categories/${categoryId}`,
      category);
  }
}

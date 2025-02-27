// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.service.ts
// Date: 26 February 2025
// Description: exporting expense API

// import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
// Creating functions to call the Category API
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories/list`);
  }
}

import { CategoryService } from './../category.service';
import { Component } from '@angular/core';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="category-page">
      <h1 class="category-page__title">Category List</h1>
      <button class="category-page__button" routerLink="/categories/add">Add Category</button>
      @if (serverMessage) {
        <div [ngClass]="{'message-alert': serverMessageType === 'error', 'message-success': serverMessageType === 'success'}">
          {{ serverMessage }}
        </div>
      }
      <!-- @if (categories && categories.length > 0) { dClemens - Changed for filtered categories -->
      @if (filteredCategories.length > 0) {
        <div style="width:40%; float:right; text-align:right; padding-right:20px;">
          <input type="text" class="category-page__search" placeholder="Search categories..." [(ngModel)]="searchQuery" (input)="filterCategories()" />
        </div>
        <table class="category-page__table">
          <thead class="category-page__table-head">
            <tr class="category-page__table-row">
              <th class="category-page__table-header">Category ID</th>
              <th class="category-page__table-header">Name</th>
              <th class="category-page__table-header">Description</th>
              <th class="category-page__table-header">User ID</th>
              <th class="category-page__table-header">Date Created</th>
              <th class="category-page__table-header">Functions</th>
            </tr>
          </thead>
          <tbody class="category-page__table-body">
            <!-- <tr *ngFor="let category of categories" class="category-page__table-row"> dClemens - Changed for filtered categories -->
            @for (category of filteredCategories; track category) {
            <tr class="category-page__table-row">
              <td class="category-page__table-cell">{{ category.categoryId }}</td>
              <td class="category-page__table-cell">{{ category.name }}</td>
              <td class="category-page__table-cell">{{ category.description }}</td>
              <td class="category-page__table-cell">{{ category.userId }}</td>
              <td class="category-page__table-cell">{{ category.dateCreated | date }}</td>
              <td class="category-page__table-cell category-page__table-cell--functions">
                <a routerLink="/categories/edit/{{category.categoryId}}" class="category-page__icon-link"><i class="fas fa-edit"></i>Edit</a>
                <a routerLink="/categories/{{category.categoryId}}" class="expense-page__icon-link"><!--<i class="fas fa-edit"></i>-->View</a>
                <a (click)="deleteCategory(category.categoryId)" class="category-page__icon-link"><i class="fas fa-trash-alt"></i>delete</a>
              </td>
            </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="category-page__no-categories">No categories found, consider adding one...</p>
      }
    </div>
  `,
  styles: `
    .category-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .category-page__title {
      text-align: center;
      color: #563d7c;
    }

    .category-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .category-page__table-header {
      background-color: #e1e1e1;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .category-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .category-page__table-cell--functions {
      text-align: center;
    }

    .category-page__icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }

    .category-page__icon-link:hover {
      color: #000;
    }

    .category-page__no-categories {
      text-align: center;
      color: #6c757d;
    }

    .category-page__button {
      background-color: #563d7c;
      color: #fff;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .category-page__button:hover {
      background-color: #6c757d;
    }

    .message-alert {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
    }

    .message-success {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
      border-color: #d6e9c6;
    }

    .category-page__search {
      width: 100%;
      padding: 8px;
      margin-bottom: 0px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `
})

export class CategoryListComponent {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.categories = response.data;
          this.filteredCategories = [...this.categories]; // Initialize filtered list
        } else {
          this.categories = [];
          this.filteredCategories = [];
        }
        console.log(`Categories: ${JSON.stringify(this.categories)}`);
      },
         error: (err: any) => {
            console.error(`Error occurred while retrieving categories: ${err}`);
            this.categories = [];
            this.serverMessage = 'Failed to fetch categories. Please try again later.'; // Set error message
            this.serverMessageType = 'error'; // Set message type to error
          },
        });
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter(category =>
      Object.values(category).some(value =>
        value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  deleteCategory(categoryId: number) {
    confirm(`Do you want to delete Category with ID: ${categoryId}?`);
  }
}

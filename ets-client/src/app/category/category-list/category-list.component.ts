import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
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
      <div style="width:55%; float:left; text-align:left;">
        <button class="category-page__button" routerLink="/categories/add">Add Category</button>
      </div>



        <div style="width:40%; float:right; text-align:right; padding-right:20px;">
          <input type="text" class="category-page__search" placeholder="Search categories..." />
        </div>
        <table class="category-page__table">
          <thead class="category-page__table-head">
            <tr class="category-page__table-row">
              <th class="category-page__table-header">
                Category ID
              </th>
              <th class="category-page__table-header">
                User ID
              </th>
              <th class="category-page__table-header">
                Name
              </th>
              <th class="category-page__table-header">
                Description
              </th>
              <th class="category-page__table-header">
                Date
              </th>
              <th class="category-page__table-header">Actions</th> <!-- No sorting here -->
            </tr>
          </thead>

          <tbody class="category-page__table-body">

              <tr class="category-page__table-row">
                <td class="category-page__table-cell"></td>
                <td class="category-page__table-cell"></td>
                <td class="category-page__table-cell"></td>
                <td class="category-page__table-cell"></td>
                <td class="category-page__table-cell"></td>
                <td class="category-page__table-cell category-page__table-cell--functions">
                  <a routerLink="/categories/edit/" class="category-page__icon-link">Edit</a>
                  <a routerLink="/categories/" class="category-page__icon-link">View</a>
                  <a (click)="deleteCategory()" class="category-page__icon-link">Delete</a>
                </td>
              </tr>

          </tbody>
        </table>
    </div>
  `,
  styles: `
    .category-page { max-width: 80%; margin: 0 auto; padding: 20px; }
    .category-page__title { text-align: center; color: #563d7c; }
    .category-page__table { width: 100%; border-collapse: collapse; }
    .category-page__table-header { background-color: #e1e1e1; color: #000; border: 1px solid black; padding: 5px; text-align: left; cursor: pointer; }
    .category-page__table-header:hover { background-color: #f1f1f1; }
    .category-page__table-cell { border: 1px solid black; padding: 5px; text-align: left; }
    .category-page__icon-link { cursor: pointer; color: #6c757d; text-decoration: none; margin: 0 5px; }
    .category-page__icon-link:hover { color: #000; }
    .category-page__no-categories { text-align: center; color: #6c757d; }
    .category-page__button { background-color: #563d7c; color: #fff; border: none; padding: 10px 20px; margin: 10px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s; }
    .category-page__button:hover { background-color: #6c757d; }
    .category-page__search { width: 100%; padding: 8px; margin-bottom: 0px; border: 1px solid #ccc; border-radius: 5px; }
  `
})
export class CategoryListComponent {
  deleteCategory() {
    if (!confirm(`Do you want to delete category with ID: ?`)) {
      return;
    }
  }
}

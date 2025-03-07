import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from './../category.service';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AddCategoryDTO } from '../category';
import { ExpenseService } from '../../expense/expense.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
  <div class="category-add-page">
    <h1 class="category-add-page__title">Add New Category</h1>
    <h4 class="category-add-page__subtitle">Fill in the details to create a new category.</h4>
    <div class="category-add-page__card">
      <form [formGroup]="categoryForm" class="v-add-page__form">
        <div class="category-add-page__form-group">
          <label for="userId" class="category-add-page__form-label">User ID</label>
          <input type="text" id="userId" class="category-add-page__form-control" formControlName="userId">
        </div>

        <div class="category-add-page__form-group">
          <label for="categoryId" class="category-add-page__form-label">Category ID</label>
          <input type="text" id="categoryId" class="category-add-page__form-control" formControlName="categoryId">
        </div>

        <div class="category-add-page__form-group">
          <label for="name" class="category-add-page__form-label">Name</label>
          <input type="text" id="name" class="category-add-page__form-control" formControlName="name">
        </div>

        <div class="category-add-page__form-group">
          <label for="description" class="category-add-page__form-label">Category Description</label>
          <textarea id="description" rows="10" class="category-add-page__form-control" formControlName="description"></textarea>
        </div>

        <!-- <div class="category-add-page__form-group">
          <label for="dateCreated" class="category-add-page__form-label">Date Created</label>
          <input type="datetime-local" id="dateCreated" class="category-add-page__formcontrol" formControlName="dateCreated">
        </div> -->

        <button type="submit" class="category-add-page__btn" (click)="onSubmit()">Add Category</button>
      </form>
    </div>

    <br />
    <a class="category-add-page__link" routerLink="/categories">Return</a>
  </div>
  `,
  styles: `
   .category-add-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
    }

    .category-add-page__title {
        text-align: center;
        color: #563d7c;
    }

    .category-add-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: .9rem;
        font-style: italic;
        margin-bottom: 20px;
    }

    .category-add-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
    }

    .category-add-page__form {
        display: flex;
        flex-direction: column;
    }

    .category-add-page__form-group {
        margin-bottom: 15px;
    }

    .category-add-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .category-add-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .category-add-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;

        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
    }

    .category-add-page__btn:hover {
        background-color: #452a63;
    }

    .category-add-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
    }

    .category-add-page__link:hover {
        text-decoration: underline;
    }`
})
export class CategoryAddComponent {
 categoryForm: FormGroup = this.fb.group({
    userId: [null, Validators.compose([Validators.required])],
    categoryId: [null, Validators.compose([Validators.required])],
    name: [null, Validators.compose([Validators.required])],
    description: [null, Validators.compose([Validators.required, Validators.maxLength(25)])]//,
    //dateCreated: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  onSubmit() {
    console.log('Button clicked');

    if (this.categoryForm.valid) {
      //const dateCreated = new Date(this.categoryForm.controls['dateCreated'].value).toISOString();

      const newCategory: AddCategoryDTO = {
        userId: Number(this.categoryForm.controls['userId'].value),
        categoryId: Number(this.categoryForm.value.categoryId),
        description: this.categoryForm.controls['description'].value,
        name: this.categoryForm.controls['name'].value,
        dateCreated: new Date().toISOString() //dateCreated
      };

      console.log('Creating Category', newCategory);

      this.categoryService.addCategory(newCategory).subscribe({
        next: (result: any) => {
          console.log(`Category created successfully: ${result.message}`);
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          console.error('Error creating category', error);
        }
      });
    }
  }
/*
    expenses: any[] = [];

  categoryForm: FormGroup = this.fb.group({
    userId: [null, Validators.compose([Validators.required])],
    categoryId: [null, Validators.compose([Validators.required])],
    name: [null, Validators.compose([Validators.required])],
    description: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
    dateCreated: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private categoryService:
    CategoryService, private expenseService: ExpenseService) {
    this.expenseService.getExpenses().subscribe({
      next: (expenses: any) => {
      this.expenses = expenses;
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const expenseId = this.categoryForm.controls['expenseId'].value;
      const dateCreated = new Date(this.categoryForm.controls['dateCreated'].value).toISOString();
      const newCategory: AddCategoryDTO = {
        name: this.categoryForm.controls['name'].value,
        description: this.categoryForm.controls['description'].value,
        userId: this.categoryForm.controls['userId'].value,
        categoryId: this.categoryForm.controls['categoryId'].value,
        dateCreated: dateCreated
      }

      this.categoryService.addCategory(expenseId, newCategory).subscribe({
        next: (result: any) => {
          console.log(`Category created successfully: ${result.message}`);
          this.router.navigate(['/categories']);
        },
        error: (err: any) => {
          console.error('Error creating category', err);
        }
      });
    }
  }
    */
}

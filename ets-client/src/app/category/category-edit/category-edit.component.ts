import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="category-edit-page">
      <h1 class="category-edit-page__title">Edit Category</h1>
      <div class="category-edit-page__card">

        <form [formGroup]="categoryForm" class="category-edit-page__form">
        <div class="category-edit-page__form-group">
            <label for="categoryId" class="category-edit-page__form-label">Category ID</label>
            <input type="number" id="categoryId" class="category-edit-page__form-control" formControlName="categoryId" readonly>
          </div>

          <div class="category-edit-page__form-group">
            <label for="name" class="category-edit-page__form-label">Name</label>
            <input type="text" id="name" class="category-edit-page__form-control" formControlName="name">
          </div>

          <div class="category-edit-page__form-group">
            <label for="userId" class="category-edit-page__form-label">User ID</label>
            <input type="number" id="userId" class="category-edit-page__form-control" formControlName="userId">
          </div>

          <div class="category-edit-page__form-group">
            <label for="description" class="category-edit-page__form-label">Description</label>
            <input type="text" id="description" class="category-edit-page__form-control" formControlName="description">
          </div>

          <button type="submit" class="category-edit-page__btn" (click)="onSubmit()">Update category</button>
        </form>
      </div>
      <br />
      <a class="category-edit-page__link" routerLink="/categories">Return</a>
    </div>
  `,
  styles: `
   .category-edit-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .category-edit-page__title {
      text-align: center;
      color: #563d7c;
    }

    .category-edit-page__card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 20px;
    }

    .category-edit-page__form {
      display: flex;
      flex-direction: column;
    }

    .category-edit-page__form-group {
      margin-bottom: 15px;
    }

    .category-edit-page__form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .category-edit-page__form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .category-edit-page__btn {
      padding: 10px 15px;
      background-color: #563d7c;
      color: #fff;
      border: none;

      border-radius: 4px;
      cursor: pointer;
      align-self: flex-start;
    }

    .category-edit-page__btn:hover {
      background-color: #452a63;
    }

    .category-edit-page__link {
      color: #563d7c;
      text-decoration: none;
      display: block;
    }

    .category-edit-page__link:hover {
      text-decoration: underline;
    }
  `
})
export class CategoryEditComponent {
  categoryId: string;
  category: Category;

  // validators for categoryForm
  categoryForm: FormGroup = this.fb.group({
    userId: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    name: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private categoryService: CategoryService) {
      this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';
    this.category = {} as Category;

    console.log('Category ID', this.categoryId);

    if (this.categoryId === '') {
      this.router.navigate(['/categories']);
      return;
    }

    // fetching details for already made categories to update
    this.categoryService.getCategory(this.categoryId).subscribe({
      next: (category: Category) => {
        this.category = category;

        this.categoryForm.setValue({
          name: category.name,
          description: category.description,
          categoryId: category.categoryId,
          userId: category.userId

        });

        console.log('Category Details', this.category);
      },
      // Error fetching details
      error: (error) => {
        console.error('Error fetching category details', error);
      },
      // setting form values to already values from the category
      complete: () => {
        this.categoryForm.controls['categoryId'].setValue(this.category.categoryId);
        this.categoryForm.controls['name'].setValue(this.category.name);
        this.categoryForm.controls['userId'].setValue(this.category.userId);
        this.categoryForm.controls['description'].setValue(this.category.description);
      }
    });
  }

  // Submitting Update Category
  onSubmit() {
    if (this.categoryForm.valid) {
     const updateCategoryDTO = {
        description: this.categoryForm.controls['description'].value,
        userId: this.categoryForm.controls['userId'].value,
        name: this.categoryForm.controls['name'].value
      };

      console.log('Updating Category', updateCategoryDTO);

      // calling to update category
      this.categoryService.updateCategory(updateCategoryDTO, +this.categoryId).subscribe({
        // successful update category
        next: (result: any) => {
          console.log(`CategoryId: ${result.categoryId} ${result.message}`); // logs update
          this.router.navigate(['/categories']); // reroutes to list
        },
        // error updating category
        error: (error) => {
          console.error('Error updating category', error);
        }
      });
    }
  }
}

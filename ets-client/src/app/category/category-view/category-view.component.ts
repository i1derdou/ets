import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="category-add-page">
    <h1 class="category-add-page__title">Category List</h1>
    <div *ngIf="category; else loading">
      <h2>{{ category.name }}</h2>
      <p><strong>Description:</strong> {{ category.description }}</p>
      <p><strong>User ID:</strong> {{ category.userId }}</p>
      <p><strong>Created On:</strong> {{ category.dateCreated | date:'short' }}</p>
      <a routerLink="/categories" class="category-add-page__link">Back to Categories</a>
    </div>
    <ng-template #loading>
      <p>Loading category details...</p>
    </ng-template>
  </div>
  `,
  styles: [`
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

    .category-add-page__link {
      color: #563d7c;
      text-decoration: none;
      display: block;
      margin-top: 15px;
    }

    .category-add-page__link:hover {
      text-decoration: underline;
    }
  `]
})
export class CategoryViewComponent {
  categoryId: string;
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';

    if (!this.categoryId) {
      this.router.navigate(['/categories']);
      return;
    }

    this.categoryService.getCategory(this.categoryId).subscribe({
      next: (data: Category) => {
        this.category = data;
      },
      error: (error) => {
        console.error('Error fetching category:', error);
        // Optionally navigate away or display an error message
        this.router.navigate(['/categories']);
      }
    });
  }
}

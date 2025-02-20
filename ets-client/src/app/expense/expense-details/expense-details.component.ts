import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="expense-details-page">
      <h1 class="expense-details-page__title">Expense Details</h1>
      <div class="expense-details-page__card">
        <form [formGroup]="expenseForm" class="expense-details-page__form">
          <div class="expense-details-page__form-group">
            <label for="userId" class="expense-details-page__form-label">User ID</label>
            <input type="number" id="userId" class="expense-details-page__form-control" formControlName="userId" readonly>
          </div>
          <div class="expense-details-page__form-group">
            <label for="description" class="expense-details-page__form-label">Description</label>
            <input type="text" id="description" class="expense-details-page__form-control" formControlName="description" readonly>
          </div>
          <div class="expense-details-page__form-group">
            <label for="categoryId" class="expense-details-page__form-label">Category ID</label>
            <input type="number" id="categoryId" class="expense-details-page__form-control" formControlName="categoryId" readonly>
          </div>
          <div class="expense-details-page__form-group">
            <label for="amount" class="expense-details-page__form-label">Amount</label>
            <input type="number" id="amount" class="expense-details-page__form-control" formControlName="amount" readonly>
          </div>
          <div class="expense-details-page__form-group">
            <label for="date" class="expense-details-page__form-label">Date</label>
            <input type="text" id="date" class="expense-details-page__form-control" formControlName="date" readonly>
          </div>
        </form>
      </div>
      <br />
      <a class="expense-details-page__link" routerLink="/expenses">Return to Expenses</a>
    </div>
  `,
  styles: `
    .expense-details-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .expense-details-page__title {
      text-align: center;
      color: #563d7c;
    }

    .expense-details-page__card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 20px;
    }

    .expense-details-page__form {
      display: flex;
      flex-direction: column;
    }

    .expense-details-page__form-group {
      margin-bottom: 15px;
    }

    .expense-details-page__form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .expense-details-page__form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .expense-details-page__link {
      color: #563d7c;
      text-decoration: none;
      display: block;
    }

    .expense-details-page__link:hover {
      text-decoration: underline;
    }
  `
})
export class ExpenseDetailsComponent {
  expenseId: string;
  expense: Expense;

  expenseForm: FormGroup = this.fb.group({
    userId: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    amount: [null, Validators.required],
    date: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private expenseService: ExpenseService) {
    this.expenseId = this.route.snapshot.paramMap.get('expenseId') || '';
    this.expense = {} as Expense;

    if (this.expenseId === '') {
      this.router.navigate(['/expenses']);
      return;
    }

    this.expenseService.getExpense(this.expenseId).subscribe({
      next: (expense: Expense) => {
        this.expense = expense;
        this.expenseForm.setValue({
          userId: expense.userId,
          description: expense.description,
          categoryId: expense.categoryId,
          amount: expense.amount,
          date: expense.date
        });
      }
    });
  }
}

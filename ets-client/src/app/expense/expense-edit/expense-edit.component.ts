// Author: Angelica Gutierrez
// Date: 21 February 2025
// File name: expense-edit.component.ts
// Description: expense-edit component

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense, UpdateExpenseDTO } from '../expense';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: ` 
    <div class="expense-edit-page">
        <h1 class="expense-edit-page__title">Edit Expense</h1>
        <div class="expense-edit-page__card">
    
            <form [formGroup]="expenseForm" class="expense-edit-page__form">
                <div class="expense-edit-page__form-group">
                    <label for="userId" class="expense-edit-page__form-label">User ID</label>
                    <input type="number" id="userId" class="expense-edit-page__form-control" formControlName="userId">
                </div>
          
                <div class="expense-edit-page__form-group">
                    <label for="description" class="expense-edit-page__form-label">Description</label>
                    <input type="text" id="description" class="expense-edit-page__form-control" formControlName="description">
                </div>
          
                <div class="expense-edit-page__form-group">
                    <label for="categoryId" class="expense-edit-page__form-label">Category ID</label>
                    <input type="number" id="categoryId" class="expense-edit-page__form-control" formControlName="categoryId">
                </div>
          
                <div class="expense-edit-page__form-group">
                    <label for="amount" class="expense-edit-page__form-label">Amount</label>
                    <input type="number" id="amount" class="expense-edit-page__form-control" formControlName="amount">
                </div>
          
                <div class="expense-edit-page__form-group">
                    <label for="date" class="expense-edit-page__form-label">Date</label>
                    <input type="text" id="date" class="expense-edit-page__form-control" formControlName="date">
                </div>

                <button type="submit" class="expense-edit-page__btn" (click)="onSubmit()">Update Expense</button> 
            </form>
        </div>
        <br />
        <a class="expense-edit-page__link" routerLink="/expenses">Return</a>
    </div>
  `,
  styles: `
    .expense-edit-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .expense-edit-page__title {
      text-align: center;
      color: #563d7c;
    }

    .expense-edit-page__card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-top: 20px;
    }

    .expense-edit-page__form {
      display: flex;
      flex-direction: column;
    }

    .expense-edit-page__form-group {
      margin-bottom: 15px;
    }

    .expense-edit-page__form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .expense-edit-page__form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    .expense-edit-page__btn { 
      padding: 10px 15px; 
      background-color: #563d7c; 
      color: #fff; 
      border: none; 

      border-radius: 4px; 
      cursor: pointer; 
      align-self: flex-start; 
    } 
 
    .expense-edit-page__btn:hover { 
      background-color: #452a63; 
    } 

    .expense-edit-page__link {
      color: #563d7c;
      text-decoration: none;
      display: block;
    }

    .expense-edit-page__link:hover {
      text-decoration: underline;
    }`
})
export class ExpenseEditComponent {
  expenseId: string;
  expense: Expense;

  // validators for expenseForm
  expenseForm: FormGroup = this.fb.group({
    userId: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    amount: [null, Validators.required],
    date: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private expenseService: ExpenseService) {
    let l_expenseId = this.route.snapshot.paramMap.get('expenseId') || '';
    this.expenseId = l_expenseId; // expenseId must be a string
    this.expense = {} as Expense;

    console.log('Expense ID', this.expenseId);

    if (isNaN(+this.expenseId)) {
      this.router.navigate(['/expenses']);
      return;
    }

    // fetching details for already made expenses to update
    this.expenseService.getExpense(this.expenseId).subscribe({
      next: (expense: Expense) => {

        // if expense is not valid, reroute to lists
        if (!expense) {
          this.router.navigate(['/expenses']);
          return;
        }

        // if expense is valid, post details
        this.expense = expense;
        console.log('Expense Details', this.expense);
      },
      // Error fetching details
      error: (error) => {
        console.error('Error fetching expense details', error);
      },
      // setting form values to already values from the expense
      complete: () => {
        this.expenseForm.controls['userId'].setValue(this.expense.userId);
        this.expenseForm.controls['description'].setValue(this.expense.description);
        this.expenseForm.controls['categoryId'].setValue(this.expense.categoryId);
        this.expenseForm.controls['amount'].setValue(this.expense.amount);
        this.expenseForm.controls['date'].setValue(this.expense.date);
      }
    });
  }

  // Submitting Update Expense
  onSubmit() {
    if (this.expenseForm.valid) {
      // setting values to UpdateExpenseDTO
      let l_expense: UpdateExpenseDTO = {
        description: this.expenseForm.controls['description'].value,
        userId: this.expenseForm.controls['userId'].value,
        categoryId: this.expenseForm.controls['categoryId'].value,
        amount: this.expenseForm.controls['amount'].value,
        date: this.expenseForm.controls['date'].value
      };

      console.log('Updating Expense', l_expense);
      
      // calling to update expense
      this.expenseService.updateExpense(l_expense, +this.expenseId).subscribe({
        // successful update expense
        next: (result: any) => {
          console.log(`ExpenseId: ${result.expenseId} ${result.message}`); // logs update
          this.router.navigate(['/expenses']); // reroutes to list
        },
        // error updating expense
        error: (error) => {
          console.error('Error updating expense', error);
        }
      });
    }
  }
}

// Author: Angelica Gutierrez
// File Name: expense-add.component.ts
// Date: 15 February 2025
// Description: Exporting the ExpenseAddComponent

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { AddExpenseDTO } from '../expense';

@Component({
    selector: 'app-expense-add',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    template: `
    <div class="expense-add-page">
        <h1 class="expense-add-page__title">Add New Expense</h1>
        <h4 class="expense-add-page__subtitle">Fill in the details to create a new expense.</h4>

        <div class="expense-add-page__card">
            <form [formGroup]="expenseForm" class="v-add-page__form">
                 <div class="expense-add-page__form-group">
                    <label for="expenseId" class="expense-add-page__form-label">Expense ID</label>
                    <input type="text" id="expenseId" class="expense-add-page__form-control" formControlName="expenseId">
                </div>

                <div class="expense-add-page__form-group">
                    <label for="userId" class="expense-add-page__form-label">User ID</label>
                    <input type="text" id="userId" class="expense-add-page__form-control" formControlName="userId">
                </div>

                <div class="expense-add-page__form-group">
                    <label for="categoryId" class="expense-add-page__form-label">Category ID</label>
                    <input type="text" id="categoryId" class="expense-add-page__form-control" formControlName="categoryId">
                </div>

                <div class="expense-add-page__form-group">
                    <label for="amount" class="expense-add-page__form-label">Expense Amount</label>
                    <input type="text" id="amount" class="expense-add-page__form-control" formControlName="amount">
                </div>

                <div class="expense-add-page__form-group">
                    <label for="description" class="expense-add-page__form-label">Expense Description</label>
                    <textarea id="description" rows="10" class="expense-add-page__form-control" formControlName="description"></textarea>
                </div>

                <div class="expense-add-page__form-group">
                    <label for="date" class="expense-add-page__form-label">Date</label>
                    <!-- <input type="text" id="date" class="expense-add-page__form-control" formControlName="date"> -->
                    <input type="datetime-local" id="date" class="expense-add-page__form-control" formControlName="date" style="width:200px;">
                </div>

                <!-- <div class="expense-add-page__form-group">
                    <label for="dateCreated" class="expense-add-page__form-label">Date Created</label>
                    <input type="datetime-local" id="dateCreated" class="expense-add-page__formcontrol" formControlName="dateCreated">
                </div>  -->

                <button type="submit" class="expense-add-page__btn" (click)="onSubmit()">Add expense</button>
            </form>
        </div>

        <br />
        <a class="expense-add-page__link" routerLink="/expenses">Return</a>
    </div>
  `,
    styles: `
    .expense-add-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
    }

    .expense-add-page__title {
        text-align: center;
        color: #563d7c;
    }

    .expense-add-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: .9rem;
        font-style: italic;
        margin-bottom: 20px;
    }

    .expense-add-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
    }

    .expense-add-page__form {
        display: flex;
        flex-direction: column;
    }

    .expense-add-page__form-group {
        margin-bottom: 15px;
    }

    .expense-add-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .expense-add-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .expense-add-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;

        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
    }

    .expense-add-page__btn:hover {
        background-color: #452a63;
    }

    .expense-add-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
    }

    .expense-add-page__link:hover {
        text-decoration: underline;
    }`
})
export class ExpenseAddComponent {
    expenseForm: FormGroup = this.fb.group({
        expenseId: [null, Validators.compose([Validators.required])],
        userId: [null, Validators.compose([Validators.required])],
        categoryId: [null, Validators.compose([Validators.required])],
        amount: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
        date: [null, Validators.compose([Validators.required])]//,
        //dateCreated: [null, Validators.required]
    });

    constructor(private fb: FormBuilder, private router: Router, private expenseService: ExpenseService) { }

    onSubmit() {
      console.log('Button clicked');

        if (this.expenseForm.valid) {
            //const dateCreated = new Date(this.expenseForm.controls['dateCreated'].value).toISOString();

            const newExpense: AddExpenseDTO = {
                expenseId: Number(this.expenseForm.controls['expenseId'].value),
                userId: Number(this.expenseForm.controls['userId'].value),
                categoryId: Number(this.expenseForm.controls['categoryId'].value),
                amount: this.expenseForm.controls['amount'].value,
                description: this.expenseForm.controls['description'].value,
                date: this.expenseForm.controls['date'].value,
                dateCreated: new Date().toISOString()
            };

            console.log('Creating Expense', newExpense);

            this.expenseService.addExpense(newExpense).subscribe({
                next: (result: any) => {
                    console.log(`Expense created successfully: ${result.message}`);
                    this.router.navigate(['/expenses']);
                },
                error: (error) => {
                    console.error('Error creating expense', error);
                }
            });
        }
    }
}

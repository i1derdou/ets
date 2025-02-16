import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="expense-page"> 
      <h1 class="expense-page__title">Expense List</h1> 
      <button class="expense-page__button" routerLink="/expenses/add">Add Expense</button> 

      @if (expenses && expenses.length > 0) { 
        <table class="expense-page__table"> 
        <thead class="expense-page__table-head"> 
          <tr class="expense-page__table-row"> 
          <th class="expense-page__table-header">Expense ID</th> 
          <th class="expense-page__table-header">User ID</th> 
          <th class="expense-page__table-header">Category ID</th> 
          <th class="expense-page__table-header">Amount</th> 
          <th class="expense-page__table-header">Description</th> 
          <th class="expense-page__table-header">Date</th> 
        </tr> 
      </thead>
    
      <tbody class="expense-page__table-body"> 
      @for (expense of expenses; track expense) { 
        <tr class="expense-page__table-row"> 
        <td class="expense-page__table-cell">{{ expense.expenseId }}</td> 
        <td class="expense-page__table-cell">{{ expense.userId }}</td> 
        <td class="expense-page__table-cell">{{ expense.categoryId }}</td> 
        <td class="expense-page__table-cell">{{ expense.amount }}</td> 
        <td class="expense-page__table-cell">{{ expense.description }}</td> 
        <td class="expense-page__table-cell">{{ expense.dateCreated }}</td> 
        <td class="expense-page__table-cell expense-page__table-cell--functions"> 
        <a routerLink="/expenses/{{expense.expenseId}}" class="expense-page__iconlink"><i class="fas fa-edit"></i></a> 
        <a (click)="deleteExpense(expense.expenseId)" class="expense-page__icon-link"><i class="fas fa-trash-alt"></i></a> 
        </td> 
      </tr> 
      } 
    </tbody> 
  </table> 
  } @else { 
    <p class="expense-page__no-expenses">No expenses found, consider adding one...</p> 
  } 
  </div> 
  `,
  styles: `
    .expense-page { 
      max-width: 80%; 
      margin: 0 auto; 
      padding: 20px; 
    } 
 
    .expense-page__title { 
      text-align: center; 
      color: #563d7c; 
    } 
 
    .expense-page__table { 
      width: 100%; 
      border-collapse: collapse; 
    } 
 
    .expense-page__table-header { 
      background-color: #FFE484; 
      color: #000; 
      border: 1px solid black; 
      padding: 5px; 
      text-align: left; 
    } 
 
    .expense-page__table-cell { 
      border: 1px solid black; 
      padding: 5px; 
      text-align: left; 
    } 
 
    .expense-page__table-cell--functions { 
      text-align: center; 
    } 
 
    .expense-page__icon-link { 
      cursor: pointer; 
      color: #6c757d; 
      text-decoration: none; 
      margin: 0 5px; 
    } 
 
    .expense-page__icon-link:hover { 
      color: #000; 
    } 
 
    .expense-page__no-expenses { 
      text-align: center; 
      color: #6c757d; 
    } 
 
    .expense-page__button { 
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
  
    .expense-page__button:hover { 
      background-color: #6c757d; 
    } `
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  errorMessage: string = '';
  constructor(private expenseService: ExpenseService) {
    this.expenseService.getExpenses().subscribe({
      next: (expenses: Expense[]) => {
        this.expenses = expenses;
        console.log(`Expenses: ${JSON.stringify(this.expenses)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving expenses: ${err}`);
        this.errorMessage = err.message;
      }
    });
  }
  deleteExpense(expenseId: number) {
    alert(`Delete expense with ID: ${expenseId}`);
  }
}

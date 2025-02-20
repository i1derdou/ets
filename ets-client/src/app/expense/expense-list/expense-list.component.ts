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
              <th class="expense-page__table-header" (click)="sortExpenses('expenseId')">
                Expense ID <span *ngIf="sortColumn === 'expenseId'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header" (click)="sortExpenses('userId')">
                User ID <span *ngIf="sortColumn === 'userId'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header" (click)="sortExpenses('categoryId')">
                Category ID <span *ngIf="sortColumn === 'categoryId'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header" (click)="sortExpenses('amount')">
                Amount <span *ngIf="sortColumn === 'amount'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header" (click)="sortExpenses('description')">
                Description <span *ngIf="sortColumn === 'description'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header" (click)="sortExpenses('dateCreated')">
                Date <span *ngIf="sortColumn === 'dateCreated'">{{ sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;' }}</span>
              </th>
              <th class="expense-page__table-header">Actions</th> <!-- No sorting here -->
            </tr>
          </thead>

          <tbody class="expense-page__table-body">
            @for (expense of expenses; track expense) {
              <tr class="expense-page__table-row">
                <td class="expense-page__table-cell">{{ expense.expenseId }}</td>
                <td class="expense-page__table-cell">{{ expense.userId }}</td>
                <td class="expense-page__table-cell">{{ expense.description }}</td>
                <td class="expense-page__table-cell">{{ expense.amount }}</td>
                <td class="expense-page__table-cell">{{ expense.description }}</td>
                <td class="expense-page__table-cell">{{ expense.dateCreated }}</td>
                <td class="expense-page__table-cell expense-page__table-cell--functions">
                  <a routerLink="/expenses/edit/{{expense.expenseId}}" class="expense-page__icon-link"><!--<i class="fas fa-edit"></i>-->Edit</a>
                  <a routerLink="/expenses/{{expense.expenseId}}" class="expense-page__icon-link"><!--<i class="fas fa-edit"></i>-->View</a>
                  <a (click)="deleteExpense(expense.expenseId)" class="expense-page__icon-link"><!---<i class="fas fa-trash-alt"></i>-->Delete</a>
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
    .expense-page { max-width: 80%; margin: 0 auto; padding: 20px; }
    .expense-page__title { text-align: center; color: #563d7c; }
    .expense-page__table { width: 100%; border-collapse: collapse; }
    .expense-page__table-header { background-color: #e1e1e1; color: #000; border: 1px solid black; padding: 5px; text-align: left; cursor: pointer; }
    .expense-page__table-header:hover { background-color: #f1f1f1; }
    .expense-page__table-cell { border: 1px solid black; padding: 5px; text-align: left; }
    .expense-page__icon-link { cursor: pointer; color: #6c757d; text-decoration: none; margin: 0 5px; }
    .expense-page__icon-link:hover { color: #000; }
    .expense-page__no-expenses { text-align: center; color: #6c757d; }
    .expense-page__button { background-color: #563d7c; color: #fff; border: none; padding: 10px 20px; margin: 10px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s; }
    .expense-page__button:hover { background-color: #6c757d; }
  `
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  errorMessage: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private expenseService: ExpenseService) {
    this.expenseService.getExpenses().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.expenses = response.data;
        } else {
          this.expenses = [];
        }
        console.log(`Expenses: ${JSON.stringify(this.expenses)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving expenses: ${err}`);
        this.errorMessage = err.message;
      }
    });
  }

  sortExpenses(column: string) {
    if (column === 'actions') return; // Prevent sorting the Actions column

    if (this.sortColumn === column) {
      // Toggle sorting direction if the same column is clicked again
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Default sorting direction when switching to a new column
      this.sortDirection = 'asc';
    }

    this.sortColumn = column;

    // Sorting logic
    this.expenses.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handling string and numeric sorting
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  }

  //  deleteExpense(expenseId: number) {
  //    confirm(`Do you want to delete expense with ID: ${expenseId}?`);
  //  }
  deleteExpense(expenseId: number) {
    if (!confirm(`Do you want to delete expense with ID: ${expenseId}?`)) {
      return;
    }

    this.expenseService.deleteExpense(expenseId).subscribe({
      next: () => {
        console.log(`Expense with ID ${expenseId} deleted successfully`);
        this.expenses = this.expenses.filter(e => e.expenseId !== expenseId); // Remove the deleted expense from the list
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting expense with ID ${expenseId}: ${err}`);
      }
    });
  }

  }

// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.service.ts
// Date: 15 February 2025
// Description: exporting expense API

import { Expense } from './expense';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddExpenseDTO } from './expense'; // importing AddExpenseDTO

@Injectable({
  providedIn: 'root'
})
// Creating functions to call the Expense API
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get<Expense[]>(`${environment.apiBaseUrl}/api/expenses`);
  }

  // addExpense method to use the AddExpenseDTO object
  addExpense(expense: AddExpenseDTO) {
    return this.http.post<Expense>(`${environment.apiBaseUrl}/api/expenses`, expense);
  }

}

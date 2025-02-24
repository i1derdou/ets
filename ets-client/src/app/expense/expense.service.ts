// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.service.ts
// Date: 15 February 2025
// Description: exporting expense API

import { Expense } from './expense';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddExpenseDTO, UpdateExpenseDTO } from './expense'; // importing AddExpenseDTO

@Injectable({
  providedIn: 'root'
})
// Creating functions to call the Expense API
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get<Expense[]>(`${environment.apiBaseUrl}/api/expenses/list`);
  }

  searchExpenses(query: string) {
    return this.http.get(`/api/expenses/list?q=${query}`);
  }


  // addExpense method to use the AddExpenseDTO object
  addExpense(expense: AddExpenseDTO) {
    return this.http.post<Expense>(`${environment.apiBaseUrl}/api/expenses`, expense);
  }

  // getExpense by Id
  getExpense(expenseId: string) {
    return this.http.get<Expense>(`${environment.apiBaseUrl}/api/expenses/${expenseId}`);
  }

  // deleteExpense
  deleteExpense(expenseId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/expenses/${expenseId}`);
  }

  // updateExpense
  updateExpense(expense: UpdateExpenseDTO, expenseId: number) {
    return this.http.patch<Expense>(`${environment.apiBaseUrl}/api/expenses/${expenseId}`,
      expense);
  }
}
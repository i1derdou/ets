// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.ts
// Date: 15 February 2025
// Description: Expense interfaces

export interface Expense {
    _id: string,
    expenseId: number,
    userId: number,
    categoryId: number,
    amount: number,
    description: string,
    date: string,
    dateCreated: string
}

export type AddExpenseDTO = Omit<Expense, '_id' | 'dateModified'>; //  add a new DTO object for new expense objects
export type UpdateExpenseDTO = Omit<Expense, '_id' | 'expenseId' | 'dateCreated' |'dateModified'> //  add a new DTO object for updated expense objects

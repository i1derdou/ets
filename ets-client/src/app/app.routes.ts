// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: app.routes.ts
// Date: 15 February 2025
// Routing for application

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense/expense-add/expense-add.component';
import { ExpenseDetailsComponent } from './expense/expense-details/expense-details.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'expenses',
    component: ExpenseListComponent
  },
  {
    path: 'expenses/add',
    component: ExpenseAddComponent
  },
  {
    path:'expenses/:expenseId',
    component: ExpenseDetailsComponent
  },
  {
    path: 'expenses/edit/:expenseId',
    component: ExpenseEditComponent
  },
  {
    path:'categories',
    component: CategoryListComponent
    },
];

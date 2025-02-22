// Author: Angelica Gutierrez
// Date: 21 February 2025
// File name: expense-edit.component.spec.ts
// Description: Tests for expense-edit component

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { Expense, UpdateExpenseDTO } from '../expense';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpenseEditComponent } from './expense-edit.component';

describe('ExpenseEditComponent', () => {
  let component: ExpenseEditComponent;
  let fixture: ComponentFixture<ExpenseEditComponent>; 
  let expenseService: ExpenseService; 
  let router: Router; 
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, ExpenseEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseEditComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Unit Test 1: should have a valid form when all fields are filled correctly
  it('should have a valid form when all fields are filled correctly', () => {

    // all fields should be filled in correctly
    component.expenseForm.controls['userId'].setValue(1000);
    component.expenseForm.controls['description'].setValue('Breakfast');
    component.expenseForm.controls['categoryId'].setValue(1);
    component.expenseForm.controls['amount'].setValue(50.25);
    component.expenseForm.controls['date'].setValue('2025-02-13T00:07:10.561Z');

    // expect it to be valid (200 code)
    expect(component.expenseForm.valid).toBeTrue();
  });

  // Unit Test 2: should call updateExpense and navigate on successful form submission
  it('should call updateExpense and navigate on successful form submission', fakeAsync(() => {
    // creating updateExpenseDTO
    const updateExpenseDTO: UpdateExpenseDTO = {
      description: 'Test Description',
      userId: 1000,
      categoryId: 1,
      amount: 50.25,
      date: '2025-02-13T00:07:10.561Z'
    };

    // mocking an expense wanting to update
    const mockExpense: Expense = {
      _id: '1',
      expenseId: 1,
      userId: 1000,
      categoryId: 1,
      amount: 50.25,
      description: 'Test Description',
      date: '2025-02-13T00:07:10.561Z',
      dateCreated: '2025-02-13T00:07:10.561Z'
    };

    spyOn(expenseService, 'updateExpense').and.returnValue(of(mockExpense));
    spyOn(router, 'navigate');

    // matching expenseForm.controls to updateExpenseDTO values
    component.expenseForm.controls['userId'].setValue(updateExpenseDTO.userId);
    component.expenseForm.controls['categoryId'].setValue(updateExpenseDTO.categoryId);
    component.expenseForm.controls['description'].setValue(updateExpenseDTO.description);
    component.expenseForm.controls['amount'].setValue(updateExpenseDTO.amount);
    component.expenseForm.controls['date'].setValue(updateExpenseDTO.date);

    component.onSubmit(); // submit
    tick(); // time passing to prove it was successful

    // asserts
    expect(expenseService.updateExpense).toHaveBeenCalledWith(updateExpenseDTO, +component.expenseId); // expenseId must be a string
    expect(router.navigate).toHaveBeenCalledWith(['/expenses']); // reroutes back to expenses
  }));

  // Unit Test 3: should handle error on form submission failure
  it('should handle error on form submission failure', fakeAsync(() => {
    // throw error when updateExpense is called
    spyOn(expenseService, 'updateExpense').and.returnValue(throwError('Error updating expense'));
    spyOn(console, 'error');

    // setting expenseForm.controls values on its own
    component.expenseForm.controls['userId'].setValue(1000);
    component.expenseForm.controls['description'].setValue('Breakfast');
    component.expenseForm.controls['categoryId'].setValue(1);
    component.expenseForm.controls['amount'].setValue(50.25);
    component.expenseForm.controls['date'].setValue('2025-02-13T00:07:10.561Z');

    component.onSubmit(); // submit
    tick(); // time passing to prove it was not successful

    // asserts
    expect(expenseService.updateExpense).toHaveBeenCalled(); // updatingExpense
    expect(console.error).toHaveBeenCalledWith('Error updating expense', 'Error updating expense'); // error 
  }));
}); 

// Author: Angelica Gutierrez
// File Name: expense-add.component.spec.ts
// Date: 15 February 2025
// Description: Tests for adding expenses

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { AddExpenseDTO, Expense } from '../expense';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpenseAddComponent } from './expense-add.component';

describe('ExpenseAddComponent', () => {
  let component: ExpenseAddComponent;
  let fixture: ComponentFixture<ExpenseAddComponent>;
  let expenseService: ExpenseService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, ExpenseAddComponent],
      providers: [
        ExpenseService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseAddComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: should have a valid form when all fields are filled correctly
  it('should have a valid form when all fields are filled correctly', () => {
    component.expenseForm.controls['expenseId'].setValue('1');
    component.expenseForm.controls['userId'].setValue('1');
    component.expenseForm.controls['categoryId'].setValue('1');
    component.expenseForm.controls['amount'].setValue('50');
    component.expenseForm.controls['description'].setValue('Test Description');
    component.expenseForm.controls['date'].setValue('2025-02-13T00:07:10.561Z');
    component.expenseForm.controls['dateCreated'].setValue('2025-02-13T00:07:10.561Z09-04T21:39:36.605Z');
    expect(component.expenseForm.valid).toBeTrue();
  });

  // Test 2: should call addExpense and navigate on successful form submission
  it('should call addExpense and navigate on successful form submission', () => {
    // creating addExpenseDTO to add expenses
    const addExpenseDTO: AddExpenseDTO = {
      expenseId: 1,
      userId: 1,
      categoryId: 1,
      amount: 50,
      description: 'Test Description',
      date: '2024-09-04T21:39:36.605Z',
      dateCreated: '2024-09-04T21:39:36.605Z'
    };

    // mocking Expense
    const mockExpense: Expense = {
      _id: '1',
      expenseId: 1,
      userId: 1,
      categoryId: 1,
      amount: 50,
      description: 'Test Description',
      date: '2025-02-13T00:07:10.561Z',
      dateCreated: '2025-02-13T00:07:10.561Z'
    };

    spyOn(expenseService, 'addExpense').and.returnValue(of(mockExpense)); // calling addExpense
    spyOn(router, 'navigate'); // navigating 

    // setting component to values
    component.expenseForm.controls['expenseId'].setValue(addExpenseDTO.expenseId);
    component.expenseForm.controls['userId'].setValue(addExpenseDTO.userId);
    component.expenseForm.controls['categoryId'].setValue(addExpenseDTO.categoryId);
    component.expenseForm.controls['amount'].setValue(addExpenseDTO.amount);
    component.expenseForm.controls['description'].setValue(addExpenseDTO.description);
    component.expenseForm.controls['date'].setValue(addExpenseDTO.date);
    component.expenseForm.controls['dateCreated'].setValue(addExpenseDTO.dateCreated);
    component.onSubmit(); // Submitting

    // Asserts
    expect(expenseService.addExpense).toHaveBeenCalledWith(addExpenseDTO); // calling with addExpenseDTO
    expect(router.navigate).toHaveBeenCalledWith(['/expenses']); // reroute to /expenses (list)
  });

  // Test 3: should handle error on form submission failure
  it('should handle error on form submission failure', () => {
    spyOn(expenseService, 'addExpense').and.returnValue(throwError('Error creating expense'));
    spyOn(console, 'error');

    // setting components to set values
    component.expenseForm.controls['expenseId'].setValue(1);
    component.expenseForm.controls['userId'].setValue(1);
    component.expenseForm.controls['categoryId'].setValue(1);
    component.expenseForm.controls['amount'].setValue(50);
    component.expenseForm.controls['description'].setValue('Test Description');
    component.expenseForm.controls['date'].setValue('2025-02-13T00:07:10.561Z');
    component.expenseForm.controls['dateCreated'].setValue(new Date);
    component.onSubmit(); // Submitting
    
    // Asserts
    expect(expenseService.addExpense).toHaveBeenCalled(); // calling addExpense
    expect(console.error).toHaveBeenCalledWith('Error creating expense', 'Error creating expense'); // Display error message in console
  });
});

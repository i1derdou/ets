// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.service.spec.ts
// Date: 15 February 2025
// Description: Tests for expenses

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseService } from './expense.service';
import { Expense } from './expense';
import { environment } from '../../environments/environment';
import { UpdateExpenseDTO } from './expense';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService]
    });
    service = TestBed.inject(ExpenseService); // for tests
    httpMock = TestBed.inject(HttpTestingController); // for tests
  });

  // verify all HTTP requests are completed
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Adding a new expense
  it('should add a new expense', () => {
    const newExpense: Expense = {
      _id: '67ad37aefc7f403e6955c701',
      expenseId: 3,
      userId: 103,
      categoryId: 7,
      amount: 30.00,
      description: "Breakfast",
      date: '2025-02-15T00:07:10.561Z',
      dateCreated: '2025-02-15T00:07:10.561Z'
    };

    // When adding expect expense to equal new expense
    service.addExpense(newExpense).subscribe(expense => {
      expect(expense).toEqual(newExpense);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/expenses`);
    expect(req.request.method).toBe('POST'); // POST request is made to the '/api/expenses' endpoint
    req.flush(newExpense); // newExpense data
  });

  it('should retrieve a single expense by ID', () => {
    const dummyExpense: any = { id: '67b4d39e9168e63a29d1c75a', expenseId: 1, categoryId: 1, userId: 1, amount: 50.25, description: 'Breakfast', date: "2025-02-13T00:07:10.561Z" };
    service.getExpense('1').subscribe(expense => {
      expect(expense).toEqual(dummyExpense);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/expenses/1`); // Update the URL to match your API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(dummyExpense);
  });

  it('should delete an existing expense via the API', () => {
    service.deleteExpense(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/expenses/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update an existing expense', () => {
    const updateExpenseDTO: UpdateExpenseDTO = {
      userId: 1000,
      description: 'Updated Description',
      categoryId: 1,
      amount: 50.25,
      date: '2025-02-13T00:07:10.561Z'
    };

    const updatedExpense: Expense = {
      _id: '1',
      expenseId: 1000,
      userId: 1000,
      description: 'Updated Description',
      categoryId: 1,
      amount: 50.25,
      date: '2025-02-13T00:07:10.561Z',
      dateCreated: '2025-02-13T00:07:10.561Z'
    };
    service.updateExpense(updateExpenseDTO, 1).subscribe(expense => {
      expect(expense).toEqual(updatedExpense);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/expenses/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedExpense);
  });
});

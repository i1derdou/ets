import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ExpenseListComponent } from './expense-list.component';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let expenseService: ExpenseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ExpenseListComponent, RouterTestingModule],
      providers: [ExpenseService]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete an expense and update the list on successful deletion', () => {
    const mockExpenses: Expense[] = [
      { _id: '1', expenseId: 1, userId: 1, categoryId: 1, amount: 50.25, description: 'Breakfast', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' },
      { _id: '2', expenseId: 2, userId: 1, categoryId: 2, amount: 30.00, description: 'Lunch', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(expenseService, 'deleteExpense').and.returnValue(of({}));

    component.expenses = mockExpenses;
    component.deleteExpense(1);

    // Verify that the expense was deleted
    expect(expenseService.deleteExpense).toHaveBeenCalledWith(1);
    expect(component.expenses.length).toBe(1); // Only one expense should remain
    expect(component.expenses[0].expenseId).toBe(2); // The remaining expense should have expenseId 2
  });

  it('should not delete an expense if the user cancels the confirmation', () => {
    const mockExpenses: Expense[] = [
      { _id: '1', expenseId: 1, userId: 1, categoryId: 1, amount: 50.25, description: 'Breakfast', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' },
      { _id: '2', expenseId: 2, userId: 1, categoryId: 2, amount: 30.00, description: 'Lunch', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' }
    ];

    // Mock the confirm dialog to return false
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(expenseService, 'deleteExpense').and.returnValue(of({}));

    component.expenses = mockExpenses;

    component.deleteExpense(1);

    expect(expenseService.deleteExpense).toHaveBeenCalledWith(1);
    expect(component.expenses.length).toBe(1); // Both expenses should remain
  });

  it('should handle errors when deleting an expense', () => {
    const mockExpenses: Expense[] = [
      { _id: '1', expenseId: 1, userId: 1, categoryId: 1, amount: 50.25, description: 'Breakfast', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' },
      { _id: '2', expenseId: 2, userId: 1, categoryId: 2, amount: 30.00, description: 'Lunch', date: '2025-02-13', dateCreated: '2025-02-18T23:25:50.961Z' }
    ];

    // Mock the confirm dialog to return true
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(expenseService, 'deleteExpense').and.returnValue(throwError('Error deleting expense'));

    component.expenses = mockExpenses;
    component.deleteExpense(1);

    expect(expenseService.deleteExpense).toHaveBeenCalledWith(1);
    expect(component.expenses.length).toBe(2); // Both expenses should remain
  });
});

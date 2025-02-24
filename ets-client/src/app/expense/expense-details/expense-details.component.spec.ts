import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseDetailsComponent } from './expense-details.component';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Expense } from '../expense';

describe('ExpenseDetailsComponent', () => {
  let component: ExpenseDetailsComponent;
  let fixture: ComponentFixture<ExpenseDetailsComponent>;
  let expenseService: ExpenseService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        ExpenseService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => '1' } // Mock the route parameter
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseDetailsComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const mockExpense: Expense = {
    _id: '1',
    expenseId: 1,
    userId: 1,
    categoryId: 1,
    amount: 100,
    description: 'Groceries',
    date: '2023-01-01',
    dateCreated: '2023-01-01'
  };
  it('should navigate to /expenses if expenseId is not provided', () => {
    const navigateSpy = spyOn(router, 'navigate');
    activatedRoute.snapshot.paramMap.get = () => null;

   
    fixture = TestBed.createComponent(ExpenseDetailsComponent);
    component = fixture.componentInstance;

    // Ensure the navigation was called
    expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
  });
});

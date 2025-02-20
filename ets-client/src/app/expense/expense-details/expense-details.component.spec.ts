import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseDetailsComponent } from './expense-details.component';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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
});

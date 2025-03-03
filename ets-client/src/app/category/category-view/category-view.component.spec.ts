import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryViewComponent } from './category-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('CategoryViewComponent', () => {
  let component: CategoryViewComponent;
  let fixture: ComponentFixture<CategoryViewComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCategory: Category = {
    categoryId: 1,
    name: 'Test Category',
    description: 'This is a test category',
    userId: 123,
    dateCreated: new Date().toISOString(),
  };

  beforeEach(async () => {
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['getCategory']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [CategoryViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryViewComponent);
    component = fixture.componentInstance;
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should display category details when data is available', () => {
    categoryServiceSpy.getCategory.and.returnValue(of(mockCategory));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test Category');
    expect(compiled.querySelector('p').textContent).toContain('This is a test category');
  });

  it('should navigate to /categories if categoryId is missing', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { paramMap: { get: () => null } } } });

    fixture = TestBed.createComponent(CategoryViewComponent);
    component = fixture.componentInstance;

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should navigate to /categories on error fetching category', () => {
    categoryServiceSpy.getCategory.and.returnValue(throwError(() => new Error('Service error')));

    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/categories']);
  });
});

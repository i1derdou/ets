

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category, UpdateCategoryDTO } from '../category';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryEditComponent } from './category-edit.component';

describe('CategoryEditComponent', () => {
  let component: CategoryEditComponent;
  let fixture: ComponentFixture<CategoryEditComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, CategoryEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryEditComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
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
    component.categoryForm.controls['userId'].setValue(1000);
    component.categoryForm.controls['description'].setValue('Breakfast');
    component.categoryForm.controls['categoryId'].setValue(1);
    component.categoryForm.controls['name'].setValue('Food');

    // expect it to be valid (200 code)
    expect(component.categoryForm.valid).toBeTrue();
  });

  // Unit Test 2: should call updateCategory and navigate on successful form submission
  it('should call updateCategory and navigate on successful form submission', fakeAsync(() => {
    // creating updateCategoryDTO
    const updateCategoryDTO: UpdateCategoryDTO = {
      description: 'Test Description',
      userId: 1000,
      name: 'Meals'
    };

    // mocking a category wanting to update
    const mockCategory: Category = {
      userId: 1000,
      categoryId: 32,
      name: 'Meals',
      description: 'Breakfast, lunch, dinner, snacks, etc.',
      dateCreated: '2021-01-01T00:00:00.000Z'
    };

    spyOn(categoryService, 'updateCategory').and.returnValue(of(mockCategory));
    spyOn(router, 'navigate');

    // matching categoryForm.controls to updateCategoryDTO values
    component.categoryForm.controls['userId'].setValue(updateCategoryDTO.userId);
    component.categoryForm.controls['description'].setValue(updateCategoryDTO.description);
    component.categoryForm.controls['name'].setValue(updateCategoryDTO.name);
    component.categoryForm.controls['categoryId'].setValue(32);

    component.onSubmit(); // submit
    tick(); // time passing to prove it was successful

    // asserts
    expect(categoryService.updateCategory).toHaveBeenCalledWith(updateCategoryDTO, +component.categoryId); // categoryId must be a string
    expect(router.navigate).toHaveBeenCalledWith(['/categories']); // reroutes back to categories
  }));

  // Unit Test 3: should handle error on form submission failure
  it('should handle error on form submission failure', fakeAsync(() => {
    // throw error when updateCategory is called
    spyOn(categoryService, 'updateCategory').and.returnValue(throwError('Error updating category'));
    spyOn(console, 'error');

    // setting categoryForm.controls values on its own
    component.categoryForm.controls['userId'].setValue(1000);
    component.categoryForm.controls['description'].setValue('Test');
    component.categoryForm.controls['name'].setValue('Meals');
    component.categoryForm.controls['categoryId'].setValue(32);

    component.onSubmit(); // submit
    tick(); // time passing to prove it was not successful

    // asserts
    expect(categoryService.updateCategory).toHaveBeenCalled(); // updatingCategory
    expect(console.error).toHaveBeenCalledWith('Error updating category', 'Error updating category'); // error

  }));
});

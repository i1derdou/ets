import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../category.service';
import { AddCategoryDTO, Category } from '../category';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryAddComponent } from './category-add.component';


describe('CategoryAddComponent', () => {
  let component: CategoryAddComponent;
  let fixture: ComponentFixture<CategoryAddComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAddComponent, ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [
        CategoryService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: should have a valid form when all fields are filled correctly
    it('should have a valid form when all fields are filled correctly', () => {
      component.categoryForm.controls['userId'].setValue('1');
      component.categoryForm.controls['categoryId'].setValue('1');
      component.categoryForm.controls['name'].setValue('TName');
      component.categoryForm.controls['description'].setValue('Test Description');
      component.categoryForm.controls['dateCreated'].setValue('2025-02-13T00:07:10.561Z09-04T21:39:36.605Z');
      expect(component.categoryForm.valid).toBeTrue();
    });
  
    // Test 2: should call addCategory and navigate on successful form submission
    it('should call addCategory and navigate on successful form submission', () => {
      // creating addCategoryDTO to add categories
      const addCategoryDTO: AddCategoryDTO = {
        userId: 1,
        categoryId: 1,
        name: 'TName',
        description: 'Test Description',
        dateCreated: '2024-09-04T21:39:36.605Z'
      };
  
      // mocking Category
      const mockCategory: Category = {
        userId: 1,
        categoryId: 1,
        name: 'TName',
        description: 'Test Description',
        dateCreated: '2025-02-13T00:07:10.561Z'
      };
  
      spyOn(categoryService, 'addCategory').and.returnValue(of(mockCategory)); // calling addCategory
      spyOn(router, 'navigate'); // navigating 
  
      // setting component to values
      component.categoryForm.controls['userId'].setValue(addCategoryDTO.userId);
      component.categoryForm.controls['categoryId'].setValue(addCategoryDTO.categoryId);
      component.categoryForm.controls['name'].setValue(addCategoryDTO.name);
      component.categoryForm.controls['description'].setValue(addCategoryDTO.description);
      component.categoryForm.controls['dateCreated'].setValue(addCategoryDTO.dateCreated);
      component.onSubmit(); // Submitting
  
      // Asserts
      expect(categoryService.addCategory).toHaveBeenCalledWith(addCategoryDTO) // calling with addCategoryDTO
      expect(router.navigate).toHaveBeenCalledWith(['/categories']); // reroute to /categories (list)
    });
  
    // Test 3: should handle error on form submission failure
    it('should handle error on form submission failure', () => {
      spyOn(categoryService, 'addCategory').and.returnValue(throwError('Error creating category'));
      spyOn(console, 'error');
  
      // setting components to set values
      component.categoryForm.controls['userId'].setValue(1);
      component.categoryForm.controls['categoryId'].setValue(1);
      component.categoryForm.controls['name'].setValue('TName');
      component.categoryForm.controls['description'].setValue('Test Description');
      component.categoryForm.controls['dateCreated'].setValue(new Date);
      component.onSubmit(); // Submitting
      
      // Asserts
      expect(categoryService.addCategory).toHaveBeenCalled(); // calling addCategory
      expect(console.error).toHaveBeenCalledWith('Error creating category', 'Error creating category'); // Display error message in console
    });
});

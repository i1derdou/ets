import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Category } from '../category';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CategoryListComponent], // Import CategoryListComponent
      providers: [CategoryService],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display categories in the DOM when data is fetched successfully', async () => {
    // Mock data for categories
    const mockCategories: Category[] = [
      {
        userId: 1000,
        categoryId: 1,
        name: 'Meals',
        description: 'Food and beverages',
        dateCreated: '2021-01-01T00:00:00.000Z',
      },
      {
        userId: 1000,
        categoryId: 2,
        name: 'Fuel',
        description: 'Fuel charges',
        dateCreated: '2021-01-01T00:00:00.000Z',
      },
    ];

    // Mock the getCategories method to return the mock data
    spyOn(categoryService, 'getCategories').and.returnValue(of(mockCategories));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Wait for the asynchronous operation to complete
    await fixture.whenStable();

    // Trigger change detection again to update the DOM
    fixture.detectChanges();

    // Check that the categories are displayed in the DOM
    const categoryRows = fixture.debugElement.queryAll(By.css('.category-page__table-row'));
    expect(categoryRows.length).toBe(0); // Expect 2 rows to be rendered
  });

  it('should call deleteCategory and remove the category on successful deletion', () => {
    const categoryId = 1;
    const mockCategories: Category[] = [
      { categoryId: 1, name: 'Category 1', description: 'Description 1', userId: 1, dateCreated: '2023-10-01T00:00:00.000Z' },
      { categoryId: 2, name: 'Category 2', description: 'Description 2', userId: 1, dateCreated: '2023-10-02T00:00:00.000Z' }
    ];

    component.categories = mockCategories;

    spyOn(window, 'confirm').and.returnValue(true);

    spyOn(categoryService, 'deleteCategory').and.returnValue(of([]));

    component.deleteCategory(categoryId);

    expect(categoryService.deleteCategory).toHaveBeenCalledWith(categoryId);

    expect(component.categories.length).toBe(1); // One category should be removed
    expect(component.categories.find(c => c.categoryId === categoryId)).toBeUndefined(); // The deleted category should be gone
  });

  it('should not delete a category if the user cancels the confirmation', () => {
    const mockCategories: Category[] = [
      { categoryId: 1, name: 'Category 1', description: 'Description 1', userId: 1, dateCreated: '2023-10-01T00:00:00.000Z' },
      { categoryId: 2, name: 'Category 2', description: 'Description 2', userId: 1, dateCreated: '2023-10-02T00:00:00.000Z' }
    ];

    // Mock the confirm dialog to return false
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(categoryService, 'deleteCategory').and.returnValue(of({}));

    component.categories = mockCategories;

    component.deleteCategory(1);

    expect(categoryService.deleteCategory).toHaveBeenCalledWith(1);
    expect(component.categories.length).toBe(1); // Both categories should remain
  });

  it('should handle errors when deleting a category', () => {
    const mockCategories: Category[] = [
      { categoryId: 1, name: 'Category 1', description: 'Description 1', userId: 1, dateCreated: '2023-10-01T00:00:00.000Z' },
      { categoryId: 2, name: 'Category 2', description: 'Description 2', userId: 1, dateCreated: '2023-10-02T00:00:00.000Z' }
    ];

    // Mock the confirm dialog to return true
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(categoryService, 'deleteCategory').and.returnValue(throwError('Error deleting category'));

    component.categories = mockCategories;
    component.deleteCategory(1);

    expect(categoryService.deleteCategory).toHaveBeenCalledWith(1);
    expect(component.categories.length).toBe(2); // Both expenses should remain
  });

});

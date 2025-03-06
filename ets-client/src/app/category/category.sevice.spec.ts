// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: categoriy.service.spec.ts
// Date: 15 February 2025
// Description: Tests for categories

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from './category';
import { environment } from '../../environments/environment';
import { UpdateCategoryDTO } from './category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService); // for tests
    httpMock = TestBed.inject(HttpTestingController); // for tests
  });

  // verify all HTTP requests are completed
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Adding a new category
  it('should add a new category', () => {
    const newCategory: Category = {
        categoryId: 1,
        userId: 1000,
        name: 'TName',
        description: 'Test Description',
        dateCreated: '2021-01-01T00:00:00.000Z'
    };

    // When adding expect category to equal new category
    service.addCategory(newCategory).subscribe(category => {
      expect(category).toEqual(newCategory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories`);
    expect(req.request.method).toBe('POST'); // POST request is made to the '/api/categories' endpoint
    req.flush(newCategory); // newCategory data
  });

  // Adding a new expense
  it('should retrieve a list of categories from the API', () => {
    const mockCategories = [
      {
        userId: 1000,
        categoryId: 1,
        name: 'Meals',
        description: 'Food and beverages',
        dateCreated: '2021-01-01T00:00:00.000Z'
      },
      {
        userId: 1000,
        categoryId: 2,
        name: 'Fuel',
        description: 'Fuel Charges',
        dateCreated: '2021-01-01T00:00:00.000Z'
      },
      {
        userId: 1000,
        categoryId: 3,
        name: 'Room',
        description: 'Overnight stays',
        dateCreated: '2021-01-01T00:00:00.000Z'
      }
    ];

    // Subscribe to the getCategories method and assert the response
    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(3); // Expect 2 categories to be returned
      expect(categories).toEqual(mockCategories); // Expect the categories to match the mock data
    });

    // Expect a single HTTP GET request to the categories endpoint
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories/list`);
    expect(req.request.method).toBe('GET'); // Expect the request method to be GET

    // Flush the mock data as the response
    req.flush(mockCategories);
  });
/*
  it('should retrieve a single category by ID', () => {
    const dummyCategory: any = { _id: '67ad37aefc7f403e6955c701',
        categoryId: 0,
        userId: 0,
        name: '',
        description: '',
        dateCreated: '' };
    service.getCategory('1').subscribe(category => {
      expect(category).toEqual(dummyCategory);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories/1`); // Update the URL to match your API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategory);
  });
 */
  it('should delete an existing category via the API', () => {
    service.deleteCategory(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
*/
  it('should update an existing category', () => {
    const updateCategory: UpdateCategoryDTO = {
      userId: 1000,
      name: 'Meals',
      description: 'Test'
    };

    const mockResponse: Category = {
      categoryId: 32,
      userId: 1000,
      name: 'Meals',
      description: 'Test',
      dateCreated: '2021-01-01T00:00:00.000Z'
    };
    service.updateCategory(updateCategory, 1).subscribe(category => {
      expect(category).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/categories/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updateCategory);
    req.flush(mockResponse);
  });
});

// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: expense.service.spec.ts
// Date: 15 February 2025
// Description: Tests for expenses

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from './category';
import { environment } from '../../environments/environment';


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

});

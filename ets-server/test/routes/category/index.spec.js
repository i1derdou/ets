// Author: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 26 February 2025
// File Name: index.spec.js
// Decription: Tests for category routes


const request = require('supertest');
const app = require('../../../src/app');
const { Category } = require('../../../src/models/category');

jest.mock('../../../src/models/category'); // Mocking the Category model

// API Tests for Category Routes
describe('Category API Tests', () => {
    describe('POST /api/category', () => {
        // Unit Test 1: should create a category successfully
        it('should create a category successfully', async () => {
            Category.prototype.save.mockResolvedValue({ categoryId: '67bf954905ab42ddef70a8ad' });

            const response = await request(app).post('/api/categories/1').send({
                categoryId: 4,
                userId: 1000,
                name: 'Test Category',
                description: 'Test Description',
                dateCreated: new Date()
            });

            // asserts
            expect(response.status).toBe(200);
            //     expect(response.body.message).toBe('Category created successfully.');
        });

        // Unit Test 2: should return validation error if description is longer
        it('should return validation error if description is longer', async () => {
            const response = await request(app).post('/api/categories/1').send({
                categoryId: 4,
                userId: 1000,
                name: 'Test Category',
                description: 'Test Description so it fails because the description is too long',
                dateCreated: new Date()
            });

            // asserts 
            expect(response.status).toBe(400);
            //      expect(response.body.message).toBe('Description cannot exceed 50 characters');
        });

        // Unit Test 3: should return validation error if name is not unique
        it('should return validation error is name is not unique', async () => {
            const response = await request(app).post('/api/categories/1').send({
                categoryId: 4,
                userId: 1000,
                name: 'Meals',
                description: 'Test Description so it fails because the description is too long',
                dateCreated: new Date()
            });

            // asserts
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe('');
        })
    });
    describe('GET /api/categories/list', () => {
        it('should get all categories', async () => {
            const mockCategories = [
                {
                    userId: 1000,
                    categoryId: 2,
                    name: 'Fuel',
                    description: 'Fuel Charges',
                    dateCreated: '2021-01-01T00:00:00.000Z'
                },
                {
                    userId: 1000,
                    categoryId: 1,
                    name: 'Meals',
                    description: 'Food and beverages',
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

            Category.find.mockResolvedValue(mockCategories);

            // Make GET request
            const response = await request(app).get('/api/categories/list');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Categories retrieved successfully');
            expect(response.body.data).toEqual(mockCategories);
        });

        //test 2
        it('should return an empty array if no categories exist', async () => {
            // Mock the find method to return an empty array
            Category.find.mockResolvedValue([]);

            // Make a GET request to /api/categories/list
            const response = await request(app).get('/api/categories/list');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Categories retrieved successfully');
            expect(response.body.data).toEqual([]); // Check that the data field is an empty array
        });

        // test 3
        it('should return a 500 error if the database query fails', async () => {
            // Mock the find method to simulate a database error
            Category.find.mockRejectedValue(new Error('Database error'));

            // Make a GET request to /api/categories/list
            const response = await request(app).get('/api/categories/list');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error')
        });

    });

})
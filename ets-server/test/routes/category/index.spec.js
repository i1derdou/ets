// Author: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 26 February 2025
// File Name: index.spec.js
// Decription: Tests for category routes


const request = require('supertest');
const app = require('../../../src/app');
const { Category } = require('../../../src/models/category');

jest.mock('../../../src/models/category'); // Mocking the Category model

// API Tests for Category Routes
describe('Category API Tests', ()=> {
    describe('POST /api/category', () => {
        // Unit Test 1: should create a category successfully
        it('should create a category successfully', async () => {
            Category.prototype.save.mockResolvedValue({categoryId: ''});

            const response = await request (app).post('/api/category').send({
                categoryId:4,
                userId:1000,
                name:'Test Category',
                description:'Test Description',
                dateCreated: new Date()
            });

            // asserts
            expect(response.status).toBe(200);
       //     expect(response.body.message).toBe('Category created successfully.');
        });

        // Unit Test 2: should return validation error if description is longer
        it('should return validation error if description is longer', async() =>{
            const response = await request(app).post('/api/category').send({
                categoryId:4,
                userId:1000,
                name:'Test Category',
                description:'Test Description so it fails because the description is too long',
                dateCreated: new Date()
            });

            // asserts 
            expect(response.status).toBe(400);
      //      expect(response.body.message).toBe('Description cannot exceed 50 characters');
        });

        // Unit Test 3: should return validation error if name is not unique
        it('should return validation error is name is not unique', async() => {
            const response = await request(app).post('/api/category').send({
                categoryId:4,
                userId:1000,
                name:'Meals',
                description:'Test Description so it fails because the description is too long',
                dateCreated: new Date()
            });

            // asserts
            expect(response.status).toBe(400);
           // expect(response.body.message).toBe('');
        })
    })

    // Get category details by ID
    describe('GET /api/category/:categoryId', () => {
        it('should retrieve category successfully', async() => {
            //const mockCategory = 
        })
    })
})
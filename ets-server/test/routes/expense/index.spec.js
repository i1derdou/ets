const request = require('supertest');
const app = require('../../../src/app');
const { Expense } = require('../../../src/models/expense');

jest.mock('../../../src/models/expense'); // Mocking the Expense model

// Test API for Expense Routes
describe('Expense API', () => {
    describe('POST /api/expense', () => {
        // Unit test 1: should create an expense successfully.
        it('should create an expense successfully', async () => {
            Expense.prototype.save.mockResolvedValue({ expenseId: '67ad37aefc7f403e6955c700' });

            const response = await request(app).post('/api/expense').send({
                expenseId: 3,
                userId: 103,
                categoryId: 7,
                amount: 75.25,
                description: 'Breakfast',
                date: new Date()
            });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Expense created successfully.');
        });

        // Unit test 2: should return validation error for invalid data.
        it('should return error if input is longer than expected characters', async () => {
            const response = await request(app).post('/api/expense').send({
                expenseId: 3,
                userId: 103,
                categoryId: 5,
                amount: 50.00,
                description: "Lunch with family of 8 on Saturday.", // Description is longer than 25 characters
                date: new Date()
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('data/description must NOT have more than 25 characters');
        });

        // Unit test 3: should return a validation error if input is incorrect.
        it('should return a validation error if input is incorrect', async () => {
            const response = await request(app).post('/api/expense').send({
                expenseId: 3,
                userId: 103, 
                categoryId: 5,
                amount: 'fifty', // amount must be a number, not a string
                description: "Lunch",
                date: new Date()
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('data/amount must be number');
        });
    });

    // Unit test for GET /api/expense/list
    describe('GET /api/expense/list', () => {
        it('should retrieve expenses successfully', async () => {
            const mockExpenses = [
                {
                    expenseId: 1,
                    userId: 103,
                    categoryId: 5,
                    amount: 50.00,
                    description: "Lunch",
                    date: "2025-02-10T12:00:00.000Z"
                },
                {
                    expenseId: 2,
                    userId: 104,
                    categoryId: 6,
                    amount: 30.75,
                    description: "Dinner",
                    date: "2025-02-11T18:30:00.000Z"
                }
            ];

            Expense.find.mockResolvedValue(mockExpenses); // Mocking database response

            const response = await request(app).get('/api/expense/list');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Expenses retrieved successfully.');
            expect(response.body.expenses).toEqual(mockExpenses);
        });
    });
});

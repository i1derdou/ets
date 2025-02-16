// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: expense.spec.js
// Description: Testing models

const mongoose = require('mongoose');
const { Expense } = require('../../src/models/expense');

// Three-unit tests to test the Expense model
// Connect to a test database 
beforeAll(async () => {
    const connectionString =
        'mongodb+srv://remoteUser:s3cret@cluster0.ykpqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    try {
        await mongoose.connect(connectionString, {
            dbName: 'ets'
        });
        console.log('Connection to the database instance was successful');
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
});

// Clear the database before each test 
beforeEach(async () => {
    await Expense.deleteMany({});
});

// Close the database connection after all tests 
afterAll(async () => {
    await mongoose.connection.close();
    console.log('Database connection closed');
});

// Unit Test 1: should create an expense successfully
describe('Expense Model Test', () => {
    it('should create an expense successfully', async () => {
        const expenseData = {
            expenseId: 2,
            userId: 102,
            categoryId: 6,
            amount: 75.25,
            description: 'Dinner',
            date:'2025-02-13T00:07:10.561Z'
        };

        const expense = new Expense(expenseData);
        const savedExpense = await expense.save();
        
        expect(savedExpense._id).toBeDefined();
        expect(savedExpense.expenseId).toBe(expenseData.expenseId);
        expect(savedExpense.userId).toBe(expenseData.userId);
        expect(savedExpense.categoryId).toBe(expenseData.categoryId);
        expect(savedExpense.amount).toBe(expenseData.amount);
        expect(savedExpense.description).toBe(expenseData.description);
        expect(savedExpense.date).toBe(expenseData.date);
    });

    // Unit Test 2: should fail to create an expense without required fields
    it('should fail to create an expense without required fields', async () => {
        const expenseData = {
            expenseId: 2,
            userId: '', // error: userId is required
            categoryId: 6,
            amount: 75.25,
            description: 'Dinner',
            date: '2025-02-13T00:07:10.561Z'
            
        };

        const expense = new Expense(expenseData);
        let err;

        try {
            await expense.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors['userId']).toBeDefined();
    });

    // Unit Test 3: should fail to create an expense with a description longer than 25 characters
    it('should fail to create an expense with a description longer than 25 characters', async () => {
        const expenseData = {
            expenseId: 2,
            userID: 102,
            categoryID: 6,
            amount: 75.25,
            description: 'R'.repeat(26), // error: description is too long
            date: '2025-02-13T00:07:10.561Z'
            
        };

        const expense = new Expense(expenseData);
        let err;

        try {
            await expense.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors['description']).toBeDefined();
        expect(err.errors['description'].message).toBe('Description cannot exceed 25 characters'); // error message
    });
}); 
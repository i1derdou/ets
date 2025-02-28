// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: categories.spec.js
// Description: Testing models

const mongoose = require('mongoose');
const { Category } = require('../../src/models/category');

// Three-unit tests to test the Category model
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
    await Category.deleteMany({});
});

// Close the database connection after all tests 
afterAll(async () => {
    await mongoose.connection.close();
    console.log('Database connection closed');
});

// Unit Test 1: should create a category successfully
describe('Category Model Test', () => {
    it('should create an category successfully', async () => {
        const categoryData = {
            categoryId: 2,
            userId: 1000,
            name: "Fuel",
            description: "Fuel Charges",
            dateCreated: new Date()
        };

        const category = new Category(categoryData);
        const savedCategory = await category.save();

        expect(savedCategory._id).toBeDefined();
        expect(savedCategory.categoryId).toBe(categoryData.categoryId);
        expect(savedCategory.userId).toBe(categoryData.userId);
        expect(savedCategory.name).toBe(categoryData.name);
        expect(savedCategory.description).toBe(categoryData.description);
        expect(savedCategory.dateCreated).toBe(categoryData.dateCreated);
    });

    // Unit Test 2: should fail to create an category without required fields
    it('should fail to create a category without required fields', async () => {
        const categoryData = {
            categoryId: 2,
            userId: '', // userId missing
            name: "Fuel",
            description: "Fuel Charges",
            dateCreated: new Date()
        };

        const category = new Category(categoryData);
        let err;

        try {
            await category.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors['userId']).toBeDefined();
    });

    // Unit Test 3: should fail to create a category with a description longer than 50 characters
    it('should fail to create an category with a description longer than 50 characters', async () => {
        const categoryData = {
            categoryId: 2,
            userId: '', // userId missing
            name: "Fuel",
            description: 'R'.repeat(51), // error: description is too long
            dateCreated: new Date()
        };

        const category = new Category(categoryData);
        let err;

        try {
            await category.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeDefined();
        expect(err.errors['description']).toBeDefined();
        expect(err.errors['description'].message).toBe('Description cannot exceed 50 characters'); // error message
    });
}); 
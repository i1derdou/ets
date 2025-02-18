// Authors: Angelica Gutierrez
// Date: 15 February 2025
// File Name: sample-data.js
// Description: Sample data to test

const mongoose = require('mongoose');
const { Expense } = require('../models/expense');

// Connect to MongoDB 
const connectionString =
    'mongodb+srv://remoteUser:s3cret@cluster0.ykpqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'ets'
async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString, {
            dbName: dbName
        });
        console.log('Connection to the database instance was successful');
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
}

connectToDatabase(); // Call the function to connect to the database 

// Sample data for Expense 
const sampleCategories = [
    {
        userId: 1000,
        categoryId: 1,
        amount: 100,
        description: "Meals",
        date: "2021-01-01T00:00:00.000Z"
    },
    {
        userId: 1000,
        categoryId: 2,
        amount: 100,
        description: "Fuel",
        date: "2021-01-01T00:00:00.000Z"
    },
    {
        userId: 1000,
        categoryId: 3,
        amount: 100,
        description: "Hotel",
        date: "2021-01-01T00:00:00.000Z"
    }
];
// Function to create sample data 
async function createSampleData() {
    try {
        // Clear existing data 
        await Expense.deleteMany({});
        // Insert sample expenses and store their IDs 
        const expenseIdMap = {};
        for (const expenseData of sampleCategories) {
            const expense = new Expense(expenseData);
            await expense.save();
            expenseIdMap[expense.name] = expense.expenseId;
            console.log('Sample expense created:', expense);
        }
        // Close the connection 
        mongoose.connection.close();
    } catch (err) {
        console.error('Error creating sample data', err);
    }
}
// Run the function to create sample data 
createSampleData();
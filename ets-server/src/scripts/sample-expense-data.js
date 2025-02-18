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
const sampleExpenses = [
    {
        expenseId: 1,
        userId: 1000,
        categoryId: 1,
        amount: 50.25,
        description: 'Breakfast',
        date: '2025-02-13T00:07:10.561Z'
    },
    {
        expenseId: 2,
        userId: 100,
        categoryId: 2,
        amount: 10.05,
        description: 'Filled up at 7-Eleven',
        date: '2025-02-13T00:07:10.561Z'
    }
];
// Function to create sample data 
async function createSampleData() {
    try {
        // Clear existing data 
        await Expense.deleteMany({});
        // Insert sample expenses and store their IDs 
        const expenseIdMap = {};
        for (const expenseData of sampleExpenses) {
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
// Authors: Angelica Gutierrez
// Date: 15 February 2025
// File Name: sample-data.js
// Description: Sample data to test

const mongoose = require('mongoose');
const { category } = require('../models/category');

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

// Sample data for category 
const sampleCategories = [
    {
        userId: 1000,
        categoryId: 1,
        name: "Food",
        description: "Food and beverages",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
    },
    {
        userId: 1000,
        categoryId: 2,
        name: "Fuel",
        description: "Fuel charges",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
    },
    {
        userId: 1000,
        categoryId: 3,
        name: "Room",
        description: "Overnight stays",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-01T00:00:00.000Z"
    }
];
// Function to create sample data 
async function createSampleData() {
    try {
        // Clear existing data 
        await Category.deleteMany({});
        // Insert sample categories and store their IDs 
        const categoryIdMap = {};
        for (const categoryData of sampleCategories) {
            const category = new category(categoryData);
            await category.save();
            categoryIdMap[category.name] = category.categoryId;
            console.log('Sample category created:', category);
        }
        // Close the connection 
        mongoose.connection.close();
    } catch (err) {
        console.error('Error creating sample data', err);
    }
}
// Run the function to create sample data 
createSampleData();
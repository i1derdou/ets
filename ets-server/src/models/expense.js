// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: expense.js
// Description: Models for expenses

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database Constraints: amount in Expenses collection must be a float value 

// Defining Expense Schema
let expenseSchema = new Schema({
    expenseId: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    amount: {
        type: Number
    },
    description: {
        type: String,
        maxLength: [25, 'Description cannot exceed 25 characters']
    },
    date: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = {
    Expense: mongoose.model('Expense', expenseSchema)
}; 
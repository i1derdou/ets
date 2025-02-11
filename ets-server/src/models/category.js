// Category Model

// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: category.js

// Requirements
const mongoose = require('mongoose') // implementing mongoose
const Schema = mongoose.Schema; // implementing schema

// Database Constraints: name in Categories collection must be unique

// Define the category schema
let categorySchema = new Schema({
    categoryId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Category name is required.'],
        minlength: [2, 'Category name must be at least 2 characters.'],
        maxlength: [50, 'Category name cannot be longer than 50 characters.'],
        unique: true
    },
    description: {
        type: String,
        maxlength: [250, 'Description cannot be longer than 250 characters.']
    }, 
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date
    }
});

module.exports = {
    Category: mongoose.model('Category', categorySchema)
}; 
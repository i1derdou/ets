// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 25 February 2025
// File Name: category.js
// Description: Models for categories

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database Constraints: 'name' in the Categories collection must be unique 

// Defining Category  Schema
let categorySchema = new Schema({
    categoryId: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLength: [50, 'Description cannot exceed 50 characters']
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = {
    Category: mongoose.model('Category', categorySchema)
}; 
// User Model

// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: user.js

// Requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database Constraints: username, userId, email from Users must be unique

// Defining User Schema
let userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        minLength: [8, 'Username must be at least 8 characters.'],
        maxLength: [15, 'Username cannot be more than 15 characters'],
        unique: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters.'],
        maxLength: [50, 'Password cannot be more than 50 characters']
    },
    email: {
        type: String,
        unique: true
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
    User: mongoose.model('User', userSchema)
}
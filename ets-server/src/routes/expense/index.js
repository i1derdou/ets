// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: index.js
// Description: Tests for routing expenses

'use strict';

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { Expense } = require('../../models/expense');
const { addExpenseSchema } = require('../../schemas'); 

const ajv = new Ajv();
// validation to the addExpense endpoint
const validateAddExpense = ajv.compile(addExpenseSchema); 

// POST request to add a new expense document to the expense collection
router.post('/', async (req, res, next) => {
    try {
        const valid = validateAddExpense(req.body);
        
        // If not valid, create 400 error
        if (!valid) {
            return next(createError(400, ajv.errorsText(validateAddExpense.errors)));
        }

        const newExpense = new Expense(req.body); // Creating new expense
        await newExpense.save(); // Saving new expense
        
        // Expense is created, send message
        res.send({
            message: 'Expense created successfully.',
            expenseId: newExpense.expenseId
        })
    } catch (err) {
        // Expense is not created correctly, send message
        console.error(`Error while creating expense: ${err}`);
        next(err);
    }
});

module.exports = router;
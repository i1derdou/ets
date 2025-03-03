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
const { addExpenseSchema, updateExpenseSchema } = require('../../schemas');

const ajv = new Ajv();
// validation to the addExpense endpoint
const validateAddExpense = ajv.compile(addExpenseSchema);
// validation to the updateExpense endpoint
const validateUpdateExpense = ajv.compile(updateExpenseSchema);

// POST request to add a new expense document to the expense collection (Angelica)
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

router.get('/list', async (req, res, next) => {
  try {
    // Fetch all expenses from the database
    const expenses = await Expense.find().lean();

    // Send retrieved expenses as response
    res.send({
      message: 'Expenses retrieved successfully.',
      data: expenses
    });
  } catch (err) {
    // Expense is not created correctly, send message
    console.error(`Error while retrieving expenses: ${err}`);
    next(err);
  }
});

// hayat week 2 delete expense by Id
router.delete('/:expenseId', async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const result = await Expense.deleteOne({ expenseId: expenseId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully', expenseId });
  } catch (err) {
    console.error(`Error while deleting expense: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:expenseId', async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.expenseId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (err) {
    console.error(`Error while getting expense: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH (update) route to update expense (Angelica)
router.patch('/edit/:expenseId', async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.expenseId }); // finding expense 

    // validating validateUpdateExpense
    const valid = validateUpdateExpense(req.body);
    // If not valid, throw 400
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateUpdateExpense.errors)));
    }

    // setting expense
    expense.set({
      userId: req.body.userId,
      description: req.body.description,
      categoryId: req.body.categoryId,
      amount: req.body.amount,
      date: req.body.date
    });

    await expense.save(); // saving/updating expense

    // If successfully updated, send success message
    res.send({
      message: 'Expense updated successfully',
      expenseId: expense.expenseId
    });

    // If not successfully updated, send failed message
  } catch (err) {
    console.error(`Error while updating expense: ${err}`);
    next(err);
  }
});

module.exports = router;
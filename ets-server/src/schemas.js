// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 10 February 2025
// File Name: schemas.js
// Description: Schemas

// Validation schema for adding new Expense documents to the expense collection
const addExpenseSchema = {
    type: 'object',
    properties: {
        expenseId: { type: 'number' },
        userId: { type: 'number' },
        categoryId: { type: 'number' },
        amount: { type: 'number' },
        description: { type: 'string', maxLength: 25 },
        date: { type: 'string' },
        dateCreated: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
    },
    required: ['expenseId', 'userId', 'categoryId'],
    additionalProperties: false
};

// New schema for updating Expense documents  
const updateExpenseSchema = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        description: { type: 'string', maxLength: 25 },
        categoryId: { type: 'number' },
        amount: { type: 'number' },
        date: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
    },
    required: ['userId', 'description', 'categoryId', 'amount', 'date'],
    additionalProperties: false
};

module.exports = {
    addExpenseSchema,
    updateExpenseSchema
};
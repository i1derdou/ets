// Authors: David Clemens, Hayat Soma, Angelica Gutierrez
// Date: 26 Febraury 2025
// File Name: index.js
// Description: Routes for categories

'use strict';

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { Category } = require('../../models/category');
const { addCategorySchema } = require('../../schemas');

const ajv = new Ajv();
// validation to the addCategory endpoint
const validateAddCategory = ajv.compile(addCategorySchema);

// POST request to add a new category document to the category collection (Angelica)
router.post('/:expenseId', async (req, res, next) => {
    try {
        const valid = validateAddCategory(req.body);
        if (!valid) {
            return next(createError(400, ajv.errorsText(validateAddCategory.errors)));
        }
        const payload = {
            ...req.body,
            expenseId: req.params.expenseId
        }
        const category = new Category(payload);
        await category.save();
        res.send({
            message: 'Category created successfully',
            id: category._id
        });
    } catch (err) {
        console.error(`Error while creating category: ${err}`);
        next(err);
    }
        
});

module.exports = router;
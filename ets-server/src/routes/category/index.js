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

// POST route to create a category
router.post('/', async (req, res, next)=>{
    try{
        const valid = validateAddCategory(req.body);

        if (!valid) {
            return next (createError(400, Ajv.errorsText(validateAddCategory.errors)));
        }

        const newCategory = new Category(req.body);
        await newCategory.save();

        res.send({
            message: 'Category created successfully.',
            categoryId: newCategory.categoryId
        });
    } catch (err) {
        console.error(`Error while creating category. ${err}`);
        next (err);
    }
});

router.get('/:categoryId', async (req, res, next)=>{
    try {
        const category = await Category.findOne({ categoryId: req.params.categoryId });
    
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        res.status(200).json(category);
      } catch (err) {
        console.error(`Error while getting category: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
      }
})

module.exports = router;
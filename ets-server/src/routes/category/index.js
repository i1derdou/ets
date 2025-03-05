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
// handle requests to create a new category for a specific expense
router.post('/:expenseId', async (req, res, next) => {
    try {
        // validating add category
        const valid = validateAddCategory(req.body);

        // If not valid, return 400 error code
        if (!valid) {
            return next(createError(400, ajv.errorsText(validateAddCategory.errors)));
        }

        // defining payload data
        const payload = {
            ...req.body, // properties from request body
            expenseId: req.params.expenseId // adds expenseId from URL parameters 
        }

        const category = new Category(payload); // new category with payload data
        await category.save(); // saving new category

        // If category is successful, send success message
        res.send({
            message: 'Category created successfully',
            id: category._id
        });

        // If not successful, send error message
    } catch (err) {
        console.error(`Error while creating category: ${err}`);
        next(err);
    }

});

router.get('/list', async (req, res, next) => {
    try {
        // fetch all categories
        const category = await Category.find();


        // send retrieved Categories as response
        res.send({
            message: 'Categories retrieved successfully',
            data: category
        });
    } catch (err) {
        //category is not created 
        console.error(`Error while retrieving categories${err}`);
        next(err);
    }
});

router.get('/:categoryId', async (req, res, next) => {
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
  });

  router.delete('/:categoryId', async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const result = await Category.deleteOne({ categoryId: categoryId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully', categoryId });
    } catch (err) {
      console.error(`Error while deleting category: ${err}`);
      res.status(500).json({ message: 'Internal server error' });
    }
}); 

module.exports = router;
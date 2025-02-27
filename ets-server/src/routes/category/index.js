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


router.get('/list', async (req, res, next) =>{
    try{
        // fetch all categories
        const category = await Category.find();
  

        // send retrieved Categories as response
        res.send({
            message:'Categories retrieved successfully',
            data: category
        });
    } catch (err) {
        //category is not created 
        console.error(`Error while retrieving categories${err}`);
        next(err);
    }
})

module.exports = router;


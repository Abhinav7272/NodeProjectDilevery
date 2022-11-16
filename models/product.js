const express = require('express');
const app = express();
const joi = require('joi')
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    },
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    price: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    vegnonveg: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }
})

const Product = mongoose.model('Product', productSchema); // to create a collection in database with name product. 

function validateProduct(product) {
    const schema = joi.object({  // defining rules 
        name: joi.string().min(5).max(50).required(),
        type: joi.string().min(5).max(255).required(),
        price: joi.string().min(5).max(255).required(),
        vegnonveg: joi.string().min(5).max(255).required()
    });
    return schema.validate(product);
    // matching object with rules 
}

exports.Product = Product;
exports.validate = validateProduct; 
exports.productValidate = validateProduct; 


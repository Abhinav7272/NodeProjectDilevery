const express = require('express');
const app = express();
const joi = require('joi')
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const orderSchema = mongoose.Schema({
    product: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    },
    typedd: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    shopname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }, 
    customername: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
})

const Order = mongoose.model('order', orderSchema); // to create a collection in database with name order. 

function validateOrder(order) {
    const schema = joi.object({  // defining rules 
        product: joi.string().min(5).max(50).required(),
        typedd: joi.string().min(5).max(255).required(),
        price: joi.string().min(0).max(255).required(),
        shopname: joi.string().min(5).max(255).required(),
        customername:joi.string().min(5).max(255).required(),
    });
    return schema.validate(order);
    // matching object with rules 
}

exports.Order = Order;
exports.validate = validateOrder; 

const express = require('express');
const app = express();
const joi = require('joi')
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    pincode: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    noDeliveryBoy: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }
})

const Shop = mongoose.model('Shop', shopSchema); // to create a collection in database with name Shop. 

function validateShop(shop) {
    const schema = joi.object( {  // defining rules 
        name: joi.string().min(5).max(50).required(),
        address: joi.string().min(5).max(255).required(),
        pincode: joi.string().min(5).max(255).required(),
        noDeliveryBoy: joi.string().min(5).max(255).required()
    });
    return  schema.validate(shop);
    // matching object with rules 
}

exports.Shop = Shop;
exports.validate = validateShop; 
exports.shopValidate = validateShop; 

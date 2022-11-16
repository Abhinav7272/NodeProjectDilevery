const express = require('express');
const app = express();
const joi = require('joi')
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const jwt = require('jsonwebtoken');
const { compile } = require('joi');
const config = require('config')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255,
        unique: false
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000,
    },
    isAdmin : {
     type : Boolean
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, email: this.email}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema); // to create a collection in database with name User. 

function validateUser(user) {
    const schema = joi.object({  // defining rules 
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required(),
        gender: joi.string().min(0).max(255).required(),
        password : joi.string().min(0).max(2000).required(),
        isAdmin : joi.boolean().invalid()
    });
    return schema.validate(user);
    // matching object with rules 
}

exports.User = User;
exports.validate = validateUser;
exports.userValidate = validateUser;


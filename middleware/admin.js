
const jwt = require('jsonwebtoken');
const config = require('config')
const { User, validate } = require("../models/user")
const express = require('express')
module.exports = async function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    const token = req.header('x-auth-token');
    const decoded = jwt.decode(token); 
    const user = await User.find({"_id":decoded._id}) ;
    console.log(user)
    if (!user[0].isAdmin) return res.status(403).send('Access denied.');
    next();
  }


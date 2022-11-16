const express = require('express');
const router = express.Router();
const Cryptr = require('cryptr');
const _ = require('lodash');
const cryptr = new Cryptr('hello this the key')
const { User, validate } = require("../models/user")


router.post('/login', async (req, res) => {

    const user = await User.findOne({"gmail":req.body.email,"password":req.body.password});
    // if(req.body.password != cryptr.decrypt(user.password)){
       if (!user) return res.status(404).send('The user with the given email and passord was not found.');
    
    
    const token = await user.generateAuthToken();
    res.header('x-auth-token', token).send("login successful!! token: "+token);
   
});

module.exports = router; 

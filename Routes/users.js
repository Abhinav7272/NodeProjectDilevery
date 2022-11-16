const express = require('express');
const router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('hello this the key')
const { User, validate } = require("../models/user")
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async')

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        // password: cryptr.encrypt(req.body.password),
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    user = await user.save();
    res.send(user);
});

router.put('/update/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // validate body 
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                password: cryptr.encrypt(req.body.password),
                isAdmin: req.body.isAdmin
            }, { new: true });
        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.send(user);
    }
)

// function asyncMiddleware(handler) {
//     return async (req, res, next) => {
//         try {
//             await handler();
//         } catch (ex) {
//             next(ex);
//         }
//     };

// }
// moved to seperate file 
// type 2
router.get('/alluser', auth, admin ,async (req, res) => {
        const user = await User.find().sort('name');
        res.send(user);
    
});

router.delete('/:id', auth, admin, async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});


// type 3   do nothing just add in index monkey patch - bind in async automaticaly using npm i express-async-errors
router.get('/user/:id', auth, admin, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});
module.exports = router; 

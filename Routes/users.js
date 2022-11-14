const express = require('express');
const router = express.Router();
const { User, validate } = require("../models/user")


router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender
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
            gender: req.body.gender
        }, { new: true });
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
})

router.get('/alluser', async (req, res) => {
    const user = await User.find().sort('name');
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});

router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});
module.exports = router; 

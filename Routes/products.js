const express = require('express');
const router = express.Router();
const { Product, validate } = require("../models/product")
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.post('/add', auth, admin ,async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        vegnonveg: req.body.vegnonveg
    })
    product = await product.save();
    res.send(product);
});

router.put('/update/:id', auth, admin , async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // validate body 

    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            vegnonveg: req.body.vegnonveg
        }, { new: true });
    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
})

router.get('/allproduct', async (req, res) => {
    const product = await Product.find().sort('name');
    res.send(product);
});

router.delete('/:id', auth, admin, async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send('The product with the given ID was not found.');
    res.send(product);
});

router.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});
module.exports = router; 

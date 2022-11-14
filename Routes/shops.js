const express = require('express');
const router = express.Router();
const { Shop, validate } = require("../models/shop")


router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let shop = new Shop({
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode,
        noDeliveryBoy: req.body.noDeliveryBoy
    })
    shop = await shop.save();
    res.send(shop);
});

router.put('/update/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // validate body 

    const shop = await Shop.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            address: req.body.address,
            pincode: req.body.pincode,
            noDeliveryBoy: req.body.noDeliveryBoy
        }, { new: true });
    if (!shop) return res.status(404).send('The shop with the given ID was not found.');

    res.send(shop);
})

router.get('/allShop', async (req, res) => {
    const shop = await Shop.find().sort('name');
    res.send(shop);
});

router.delete('/:id', async (req, res) => {
    const shop = await Shop.findByIdAndRemove(req.params.id);
    if (!shop) return res.status(404).send('The shop with the given ID was not found.');
    res.send(shop);
});

router.get('/shop/:id', async (req, res) => {
    const shop = await Shop.findById(req.params.id);

    if (!shop) return res.status(404).send('The shop with the given ID was not found.');

    res.send(shop);
});
module.exports = router; 

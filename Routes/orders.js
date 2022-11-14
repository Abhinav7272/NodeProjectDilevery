const express = require('express');
const router = express.Router();
const { Order, validate } = require("../models/order")
const { Shop, shopValidate } = require("../models/shop")
const { User, userValidate } = require("../models/user")
const { Product, productValidate } = require("../models/product")


router.post('/add', async (req, res) => {
    const shopcheck = await Shop.find({"name":req.body.shopname});
    if (shopcheck.length === 0) return res.status(400).send("shop name is not correct! please enter a valid shop name")
   
    const usercheck = await User.find({ "name": req.body.customername });
    if (usercheck.length === 0) return res.status(400).send("customer name is not correct! please enter a valid user name");

    const productcheck = await Product.find({ "name": req.body.product });
    if (productcheck.length === 0 ) return res.status(400).send("product name is not correct! please enter a valid product name");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order({
        product: req.body.product,
        customername: req.body.customername,
        shopname: req.body.shopname,
        price: req.body.price,
        typedd: req.body.typedd
    })
    order = await order.save();
    res.send(order);
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

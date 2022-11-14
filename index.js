const express = require('express');
const app = express();
const shops = require('./Routes/shops');
const users = require('./Routes/users');
const products = require('./Routes/products');
const orders = require('./Routes/orders');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pizza_app')
   .then(() => console.log("connection successful.............."))
   .catch(err => console.err('failed to connect'));

app.use(express.json());
app.use('/api/shops', shops);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

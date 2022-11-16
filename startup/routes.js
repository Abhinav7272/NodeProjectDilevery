
const shops = require('../Routes/shops');
const users = require('../Routes/users');
const products = require('../Routes/products');
const orders = require('../Routes/orders');
const logins = require('../Routes/logins')
const error = require('../middleware/error')

module.exports = function (app) {
    app.use('/api/shops', shops);
    app.use('/api/users', users);
    app.use('/api/products', products);
    app.use('/api/orders', orders);
    app.use('/api/logins', logins);
    app.use(error);

}
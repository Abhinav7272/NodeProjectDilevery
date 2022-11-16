require('express-async-errors');
const winston = require('winston');
const express = require('express');
const app = express();
app.use(express.json());

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db1 = config.get('db1');
  const db2 = config.get('db2');

  mongoose.connect(db1)
    .then(() => winston.info(`Connected to ${db1} and ${db2}...`));
}
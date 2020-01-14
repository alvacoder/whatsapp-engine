// Loads the environment variables from the .env file
require('dotenv').config();

let mysql = require('mysql'),
    config = require('./config'),
    status = process.env.STATUS || 'test',
    mysqlConfig = config[status];

mysqlConfig.connectionLimit = 1000;
mysqlConfig.timeout = 60 * 60 * 1000;
mysqlConfig.acquireTimeout = 60 * 60 * 1000;
mysqlConfig.connectTimeout = 60 * 60 * 1000;

module.exports = mysql.createPool(mysqlConfig);
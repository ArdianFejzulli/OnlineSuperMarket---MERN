require("dotenv").config();

const mysql = require("mysql2");
const bluebird = require("bluebird");

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlineshop',
  port: 3306,
  Promise: bluebird,
};

let connection = mysql.createPool(config);

module.exports = connection;
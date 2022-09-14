const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});
connection.connect((err) => {
  if (!err) {
    console.log('Connection was successfull');
  }else{
    console.log('Connection was not successfull');
  }
});

module.exports = connection;
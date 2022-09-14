const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


module.exports = app;
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection');
const UserRoute = require('./routes/user');
const hbs = require('nodemailer-express-handlebars');
const TestRoute = require('./routes/test');


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/user', UserRoute);
app.use('/api/test', TestRoute);


module.exports = app;
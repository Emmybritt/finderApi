const connection = require('../connection');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();


var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});


function sendMail(email,subject, message) {
  var mailOption = {
    from: process.env.MAIL_USER,
    to: email,
    subject,
    html: message,
    // template: 'index'
  };
  transport.sendMail(mailOption, (err, res) => {
    if (!err) {
      return res.status(200).json({status: true, success_message: "An Email has been sent to your inbox"})
    }else{
      return res.status(500).json({status: false, error_message: ""})
    }
  })
}

router.get("/test",(req, res) => {
  return res.status(200).json({message: "It is working perfectly"})
});



router.post("/register", (req, res) =>{
  const user = req.body;
  var appUSerId = 'finder'+'_'+uuidv4();
  if (!user.name || !user.phone_number || !user.email || !user.password) {
    return res.status(400).json({status: false, error_message: 'Input your name, email, phone number and password'});
  }
  var query = "select email from user where email=?";
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <=0) {
        bcrypt.hash(user.password, 10).then((hashedPassword) => {
          var query = "insert into user(app_userId, name, phone_number, email, password, ip_address)values(?, ?, ?, ?, ?, ?)";
        connection.query(query, [appUSerId, user.name, user.phone_number, user.email, hashedPassword, user.ip_address], (err, result) => {
          if (!err) {
            const subject = 'Registeration Completed on finder';
            const message = `<p>Hi ${user.name}</p>
            <p>Congratulation For signing into finder</p>`;
            sendMail(user.email, subject, message);
            return res.status(200).json({status: true, success_message: "An Email As been sent to you"})
          }else{
            return res.status(500).json({status: false, err});
          }
        });
        })
        
      }else{
        return res.status(401).json({status: false, error_message: "User Already Exist", success_message: null})
      }
    }else{
      return res.status(500).json({status: false, err});
    }
  })
});



router.post("/login", (req,res) => {
  const body = req.body;
  if (!body.email || !body.password) {
    return res.status(400).json({status: false, error_message: "Enter Yout Email And Password"})
  }
  var query = "select * from user where email=?";
  connection.query(query, [body.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        return res.status(401).json({status: false, error_message: "User Not Found!!"})
      }else{
        var hashedPassword = bcrypt.compare(body.password, result[0].password).then((err, result) => {
          if (!err) {
            if (result) {
              const response = {email: body.email, password: body.password}
              const userToken = jwt.sign(response);
              return res.status(200).json({status: true, userToken, response});
            }else{
              return res.status(401).json({status: false, error_message: "Incorrect Username or password"});
            }
          }else{
            return res.status(500).json({status: false, err});
          }
        })
      }
    }else{
      return res.status(500).json({status: false, err});
    }
  })
})





module.exports = router;

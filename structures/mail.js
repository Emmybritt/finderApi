require('dotenv').config();
const nodemailer = require('nodemailer');
const Languages = require('../languages/Languages');

class Mail{
  constructor() {

  }

  transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  sendMailTo(email,subject, message) {
    let mailOption ={ 
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html: message
    }
    this.transport.sendMail(mailOption, (err, result) => {
      if (err) return {status: false, err};
      return {status: true, message: Languages.email_success}
    });
  }
}

module.exports = Mail;
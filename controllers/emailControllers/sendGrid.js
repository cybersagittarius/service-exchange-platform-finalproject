const dotenv = require('dotenv');
dotenv.config({path: '../config/config.env'});
const sgMail = require('@sendgrid/mail');

const sendPwResetEmail = (token) => {

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'cyberyoma@hotmail.com', // Change to your recipient
  from: 'hidomi@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = { sendPwResetEmail }

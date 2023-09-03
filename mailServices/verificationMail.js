// function to send verification mail to new mails 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.sendVerificationMail = async (userMail) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.MAIL}`,
      pass: `${process.env.PASS}`
    },
  });

  let token = jwt.sign({ userMail }, process.env.SECRET_TOKEN, { expiresIn: `1d` });

  let mailOptions = {
    from: '1st task',
    to: `${userMail}`,
    subject: "verify your account",
    text: "please click the verify button to verify your account",
    html: `<b> <a href= 'http://localhost:${process.env.port}/verifyAccount?token=${token}' target= '_blank'>verify</b>`,
  };
  let obj = {
    statusCode: 200,
    message: "success and verification mail was sent "
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      obj.statusCode = 400,
        obj.message = "success but can not send verification mail"
    }
  })

  return obj;
}
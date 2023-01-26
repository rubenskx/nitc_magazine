var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhay_b200732cs@nitc.ac.in',
    pass: '10-17-02'
  }
});
var x=374352;
var name="Abhay";
var mailOptions = {
  from: 'abhay_b200732cs@nitc.ac.in',
  to: 'abhayunni531@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `Hello ${name}, your code is ${x}`,
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

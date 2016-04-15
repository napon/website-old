var express = require('express');
var app = express();
var nodemailer = require("nodemailer");

app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}); 
var smtpTransport = nodemailer.createTransport('SMTP', { 
    service: 'Gmail',
    auth: {
        user: 'ms4694642@gmail.com',
        pass: 'coolstorybro'
    }
});

app.get('/send', function(req, res) {
	var mailOptions = {
		to: "napontaratan@gmail.com",
		subject: "Mail from " + req.query.fromName,
		text: req.query.message + " contact: " + req.query.fromPhone
	};

	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response) {
	     if (error) {
		console.log(error);
		res.end("error");
	     } else {	
        	console.log("Message sent: " + response.message);
        	res.end("sent");
     	     }
	});
});

app.listen(7557, function() {
	console.log('mail service started on 7557.');
});

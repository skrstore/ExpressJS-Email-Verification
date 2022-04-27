const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const cryptoRandomString = require("crypto-random-string");
const pug = require("pug");

module.exports = (req, res) => {
  const { email } = req.body;
  const token = cryptoRandomString(16);

  const user = new User({
    email,
    token
  });

  user
    .save()
    .then(result => {
      console.log(result.email);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "AAAAA@gmail.com",
      pass: "xxxx"
    }
  });

  const link = `http://${req.hostname}:3000/verify/${email}/${token}`;

  const mailOptions = {
    from: "Apple",
    to: req.body.email,
    subject: "Website Testing",
    text: "This is a testing Email",
    html: pug.renderFile("./views/mail.pug", { title: "Test", link: link })
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Mail not sended");
    } else {
      res.send(info);
    }
  });
};

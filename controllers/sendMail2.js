const nodemailer = require("nodemailer");

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

function sendMail(receiver, subject, text, html) {
  return transport.sendMail({
    from: SENDER_EMAIL,
    to: receiver,
    subject: subject,
    text: text,
    html: html,
  });
}

module.exports = sendMail;

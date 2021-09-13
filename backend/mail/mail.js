require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.transport = transport;
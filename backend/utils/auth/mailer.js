const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  pool: true,         // enable pooling
  maxConnections: 5,  // max 5 connections at a time
  rateLimit: true,    // prevent Gmail throttling
});

module.exports = transporter;

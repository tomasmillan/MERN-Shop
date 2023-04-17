const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error(error);
    } else {
      console.log("this is success " + success);
    }
  });

  const mailOptions = {
    from: {
      name: name,
      address: process.env.EMAIL,
    },
    to: 'info@isiuey.org',
    subject: `${name}: ${subject}`,
    text: message,
    secure: true,
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      console.log(info.response + "mensaje enviado");
      res.status(200).send(info.response)
    }
  });
});

module.exports = router;

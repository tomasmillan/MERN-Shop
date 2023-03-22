const Joi = require("joi");
const express = require("express");
const { Message } = require("../models/message");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().min(3).max(200).required().email(),
    message: Joi.string().min(6).max(500).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send("Error: Complete los campos");

  console.log(schema)
  res.send(console.log('hols'));
});

module.exports = router;

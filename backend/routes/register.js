const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send("Error: Complete los campos");

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("El usuario ya existe");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = genAuthToken(user);

  res.send(token);
});
module.exports = router;

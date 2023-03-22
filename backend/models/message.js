const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 500,
  },
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;

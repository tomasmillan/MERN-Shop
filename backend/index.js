const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const products = require("./products");
const register = require("./routes/register");
const login = require("./routes/login");
const contactform = require("./routes/contactform");
const payment = require('./routes/payment');

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/payment", payment);
app.use("/api/send", contactform);


app.get("/", (req, res) => {
  res.send("Welcome to the Server Shop");
});
app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`server started on ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`mongodb connected on ${port}`))
  .catch((err) => console.log("connect error", err.message));

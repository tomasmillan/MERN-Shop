const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");
const { isAdmin, auth } = require("../middleware/auth");
const router = express.Router();

router.post("/", isAdmin, async (req, res) => {
  const { name, brand, description, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineShop",
      });
      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          description,
          price,
          image: uploadRes,
        });

        const saveProduct = await product.save();

        res.status(200).send(saveProduct);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

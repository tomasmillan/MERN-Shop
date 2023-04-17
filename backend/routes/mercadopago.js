const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");
require("dotenv").config();

const router = express.Router();

const { Order } = require("../models/order");
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  const customer = {
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  };
  const { userId, cartItems } = req.body;

  const preference = {
    items: cartItems.map((item) => {
      return {
        title: item.name,
        quantity: item.cartQuantity,
        unit_price: item.price,
      };
    }),
    back_urls: {
      success: `${process.env.CLIENT_URL}/checkoutSuccess`,
      failure: `${process.env.CLIENT_URL}/cart`,
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const { id: preferenceId, init_point: initPoint } = response.body;
    //res.redirect(303, initPoint);
    res.send({ url: preference.url });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

const createOrder = async (customer, data, preferenceId) => {
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.cartQuantity,
    };
  });
  // Guardar la orden en la base de datos
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
    preferenceId,
  });
  const savedOrder = await newOrder.save();
  console.log("Processed Order:", savedOrder);
};

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;
    let webhookSecret = process.env.WEBHOOK_SECRET;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["mercadopago-signature"];

      try {
        event = mercadopago.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.type;
      eventType = data;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      console.log("⚠️  No se ha configurado la clave secreta del webhook de MercadoPago");
      return res.sendStatus(400);
    }

    switch (eventType) {
      case "checkout.preference.completed":
        // Obtener el cliente y el ID de la preferencia del evento
        const { customer } = data;
        const { id: preferenceId } = data;

        // Llamar a la función createOrder para procesar la orden
        try {
          await createOrder(customer, data, preferenceId);
          return res.sendStatus(200);
        } catch (err) {
          console.log(`⚠️  Failed to create order: ${err}`);
          return res.sendStatus(500);
        }
      // Otros casos para otros tipos de eventos
      // ...
      default:
        console.log(`⚠️  Unknown event type: ${eventType}`);
        return res.sendStatus(400);
    }
  }
);

module.exports = router;

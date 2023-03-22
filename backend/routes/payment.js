const express = require("express");
const PaymentController = require("../controllers/PaymentController");
 //importamos el controller

const PaymentService = require("../services/PaymentSerice"); 
//importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); 
const router = express.Router();
router.post("/",  (req, res) => {
PaymentInstance.getMercadoPagoLink(req,res)
});
router.post('/', (req, res) => PaymentInstance.webhook(req, res))

module.exports = router;

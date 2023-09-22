const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const {processPayment,sendStripeApiKey} =require('../controller/paymentController.js')
const paymentRouter = express.Router();

paymentRouter
.route("/payment/process")
.post(isAuthenticated,processPayment);

paymentRouter
.route("/stripeapikey")
.get(sendStripeApiKey);

module.exports = paymentRouter;
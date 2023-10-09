const express = require("express");
const authController = require("../controllers/authController");
const rentingController = require("../controllers/rentingController");
const router = express.Router();

router.get(
  "/checkout-session/:listingId",
  authController.protect,
  rentingController.getCheckoutSession
);

router.get("/payment-success", rentingController.createRentingPeriod);

// router.get("/smth", rentingController.test);

module.exports = router;

const express = require("express");
const multer = require("multer");
const listingController = require("../controllers/listingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create", listingController.createListing);
router.get("/alllistings", listingController.getAll);
router
  .get("/:id", listingController.getOne)
  .patch(
    "/:id",
    authController.protect,
    listingController.uploadVerificationPhoto,
    listingController.updateListing
  )
  .delete("/:id", listingController.deleteListing);

module.exports = router;

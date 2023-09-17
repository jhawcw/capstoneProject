const express = require("express");
const multer = require("multer");
const listingController = require("../controllers/listingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/create",
  authController.protect,
  listingController.uploadListingPhoto,
  listingController.resizeUploads,
  listingController.createListing
);
router.get("/alllistings", listingController.getAll);
router.get("/allunverifiedlistings", authController.protect, listingController.getAllUnverified);
router
  .get("/:id", listingController.getOne)
  .patch(
    "/:id",
    authController.protect,
    listingController.uploadVerificationPhoto,
    listingController.updateListing
  )
  .delete("/:id", listingController.deleteListing);

router.post(
  "/testupload",
  authController.protect,
  listingController.uploadListingPhoto,
  listingController.testUpload
);

module.exports = router;

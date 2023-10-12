const express = require("express");
const multer = require("multer");
const listingController = require("../controllers/listingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/download/:filename", listingController.downloadSampleAgreement);
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
    listingController.uploadListingPhoto,
    listingController.resizeUploads,
    listingController.updateListing
  )
  .delete("/:id", listingController.deleteListing);

router.post(
  "/agreement/:id",
  authController.protect,
  listingController.uploadTenancyAgreement,
  listingController.updateListingAgreement
);

router.patch(
  "/verifylisting/:id",
  authController.protect,
  listingController.uploadVerificationPhoto,
  listingController.verifyListing
);
router.get("/myagreement/:id", listingController.myAgreement);

router.get("/continuous-update/:id", listingController.continuousNewData);

module.exports = router;

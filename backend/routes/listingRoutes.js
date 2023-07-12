const express = require("express");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/create", listingController.createListing);
router.get("/alllistings", listingController.getAll);
router
  .get("/:id", listingController.getOne)
  .patch("/:id", listingController.updateListing)
  .delete("/:id", listingController.deleteListing);

module.exports = router;

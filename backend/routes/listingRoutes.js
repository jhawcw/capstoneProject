const express = require("express");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/create", listingController.createListing);
router.get("/alllistings", listingController.getAll);
router.get("/:id", listingController.getOne);

module.exports = router;

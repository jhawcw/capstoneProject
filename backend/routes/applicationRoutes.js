const express = require("express");
const applicationController = require("../controllers/applicationController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create/:id", authController.protect, applicationController.createApplication);
router.get(
  "/myapplications",
  authController.protect,
  applicationController.myApplicationAsLandlord
);
router.delete("/delete/:id", authController.protect, applicationController.deleteApplication);
router.patch(
  "/updatestatus/:id",
  authController.protect,
  applicationController.updateStatusApplication
);

module.exports = router;

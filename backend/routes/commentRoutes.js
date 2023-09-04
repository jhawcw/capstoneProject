const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create/:id", authController.protect, commentController.createComment);
router.delete("/delete/:id", authController.protect, commentController.deleteComment);
router.get("/related-comments/:id", authController.protect, commentController.getRelatedComments);
router.patch("/update/:id", authController.protect, commentController.updateComment);

module.exports = router;

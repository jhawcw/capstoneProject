const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

// Landlord register endpoint
router.post(
  "/landlord/register",
  userController.landlordRegister,
  userController.sendSuccessfulRegistration
);
// tenant register endpoint
router.post("/tenant/register", userController.tenantRegister);
// Admins to get all users endpoint
router.get("/allusers", authController.protect, userController.getAll);
// For All users to login and get JWT
router.post("/login", authController.login);
// For admin to delete user and for user to update their password
router
  .delete("/:id", userController.deleteUser)
  .patch("/:id", userController.uploadUserPhoto, userController.updateUserPassword);

// For all user to obtain their own profile
router.get("/my-profile", userController.getProfile);

// router.post("/testregister", userController.uploadUserPhoto, userController.pairTest);
router.get("/check-cookie", authController.checkCookie);
module.exports = router;

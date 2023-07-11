const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

// Landlord register endpoint
router.post("/landlord/register", userController.landlordRegister);
// tenant register endpoint
router.post("/tenant/register", userController.tenantRegister);
// Admins to get all users endpoint
router.get("/allusers", userController.getAll);
// For All users to login and get JWT
router.post("/login", authController.login);

module.exports = router;

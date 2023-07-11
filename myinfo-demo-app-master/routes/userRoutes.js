const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/landlord/register", userController.landlordRegister);
router.post("/tenant/register", userController.tenantRegister);
router.get("/allusers", userController.getAll);

module.exports = router;

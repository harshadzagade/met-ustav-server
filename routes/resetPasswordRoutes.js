const express = require("express");
const router = express.Router();

// Import controller
const resetPasswordController = require("../controllers/ResetPasswordController");

router.post("/forget-password", resetPasswordController.forgetPassword);
router.post("/verify-otp", resetPasswordController.verifyOTPAndResetPassword);

module.exports = router;

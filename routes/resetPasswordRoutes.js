const express = require("express");
const router = express.Router();

// Import controller
const resetPasswordController = require("../controllers/ResetPasswordController");

router.post("/send-otp", resetPasswordController.forgetPassword);
router.post("/reset-password", resetPasswordController.verifyOTPAndResetPassword);

module.exports = router;

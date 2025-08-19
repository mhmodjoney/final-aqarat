const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registrationSchema, loginSchema, verifyOtpSchema, validateRequest } = require('../middlewares/regValidaters');

// here are auth routs will be...
router.post('/register',    validateRequest(registrationSchema),authController.create);
router.post('/login',       validateRequest(loginSchema),       authController.login);
router.post('/logout',                                          authController.logout);
router.post('/verify-otp',  validateRequest(verifyOtpSchema),   authController.otpVerification);
router.post('/set-otp',     validateRequest(verifyOtpSchema),   authController.setOtp);
module.exports = router;
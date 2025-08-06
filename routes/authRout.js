const express = require('express');
const router = express.Router();
const regController = require('../controllers/authController');
const { registrationSchema, loginSchema, validateRequest } = require('../middlewares/regValidaters');

// here are auth routs will be...
router.post('/register', validateRequest(registrationSchema), regController.create);
router.post('/login', validateRequest(loginSchema), regController.login);
router.post('/logout', regController.logout);
module.exports = router;
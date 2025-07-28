const express = require('express');
const router = express.Router();
const regController=require('../controllers/authController')
// here are auth routs will be...
router.post('/register',regController.create);
router.post('/login',regController.login);
router.post('/logout',regController.logout);
module.exports = router;
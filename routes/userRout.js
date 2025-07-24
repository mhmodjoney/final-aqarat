const express =require('express');
const router = express.Router();
const userController= require('../controllers/userController');
// here are auth routs will be...
router.post('/profile',userController.profile);
router.post('/update',userController.update);
router.post('/delete',userController.delete);

module.exports = router;
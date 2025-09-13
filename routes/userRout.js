const express =require('express');
const router = express.Router();
const userController= require('../controllers/userController');
const { updateSchema, validateRequest } = require('../middlewares/userValidaters');
const ensureAuth = require('../middlewares/authMiddleware');

router.post('/update', validateRequest(updateSchema), ensureAuth,userController.update);
router.post('/delete',                                ensureAuth,userController.delete);


module.exports = router;
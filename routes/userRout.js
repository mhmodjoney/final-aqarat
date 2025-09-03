const express =require('express');
const router = express.Router();
const userController= require('../controllers/userController');
const { updateSchema, validateRequest } = require('../middlewares/userValidaters');

router.post('/update', validateRequest(updateSchema), userController.update);
router.post('/delete',                                userController.delete);


module.exports = router;
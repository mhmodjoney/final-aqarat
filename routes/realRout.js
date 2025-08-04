const express = require('express');
const router = express.Router();
const realController=require('../controllers/realEstateController')
// here are auth routs will be...
router.post('/create',realController.create);
router.post('/delete',realController.delete);
router.post('/search',realController.getAllRealEstate);
router.post('/myestate',realController.myestate);
module.exports = router;
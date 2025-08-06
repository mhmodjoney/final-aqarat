const express = require('express');
const router = express.Router();
const realController=require('../controllers/realEstateController')
// here are auth routs will be...
router.post('/create',realController.create);
router.post('/search',realController.searchRealEstate);
router.post('/delete',realController.delete);
router.post('/update',realController.update);
router.post('/myestate',realController.myestate);
module.exports = router;
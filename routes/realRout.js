const express = require('express');
const router = express.Router();
const realController=require('../controllers/realEstateController')
const { validateRequest, createEstateSchema, updateEstateSchema, deleteEstateSchema, searchEstateSchema } = require('../middlewares/estateValidaters');
const ensureAuth = require('../middlewares/authMiddleware');

// here are auth routs will be...
router.post('/create', validateRequest(createEstateSchema), ensureAuth,realController.create);
router.post('/search', validateRequest(searchEstateSchema), realController.searchRealEstate);
router.post('/delete', validateRequest(deleteEstateSchema), ensureAuth,realController.delete);
router.post('/update', validateRequest(updateEstateSchema), ensureAuth,realController.update);
router.post('/myestate',realController.myestate);

module.exports = router;
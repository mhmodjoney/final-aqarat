const express = require('express');
const router = express.Router();
const realController=require('../controllers/realEstateController')
const { validateRequest, createEstateSchema, updateEstateSchema, deleteEstateSchema, searchEstateSchema } = require('../middlewares/estateValidaters');
// here are auth routs will be...
router.post('/create', validateRequest(createEstateSchema), realController.create);
router.post('/search', validateRequest(searchEstateSchema), realController.searchRealEstate);
router.post('/delete', validateRequest(deleteEstateSchema), realController.delete);
router.post('/update', validateRequest(updateEstateSchema), realController.update);
router.post('/myestate',realController.myestate);

module.exports = router;
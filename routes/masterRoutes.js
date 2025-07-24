const express =require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');
const authRout =require('./authRout')
const favRout =require('./favRout')
const userRout =require('./userRout')
// this is a master Rout file to sapret other routes 
router.post('/realestate', realEstateController.getAllRealEstate);
router.post('/auth',authRout);
router.post('/fav',favRout);
router.post('./userRout',userRout);
module.exports = router;

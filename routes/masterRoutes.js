const express =require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');
const authRout =require('./authRout')
const favRout =require('./favRout')
const userRout =require('./userRout')
// this is a master Rout file to sapret other routes 
router.use('/realestate', realEstateController.getAllRealEstate);
router.use('/auth',authRout);
router.use('/fav',favRout);
router.use('./userRout',userRout);
module.exports = router;

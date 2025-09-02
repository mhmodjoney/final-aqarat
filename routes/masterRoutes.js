const express =require('express');
const router = express.Router();
const realEstateRout = require('./realRout');
const authRout =require('./authRout')
// const favRout =require('./favRout')
const userRout =require('./userRout')




// this is a master Rout file to sapret other routes 
router.use('/realestate', realEstateRout);
router.use('/auth',authRout);
// router.use('/fav',favRout);
router.use('/user',userRout);
module.exports = router;

const express =require('express');
const router = express.Router();
const realEstateRout = require('./realRout');
const authRout =require('./authRout')
// const favRout =require('./favRout')
const userRout =require('./userRout')
const imageRout=require('./imageRout')
const ensureAuth = require('../middlewares/authMiddleware');



// this is a master Rout file to sapret other routes 
router.use('/realestate', realEstateRout);
router.use('/auth',authRout);
// router.use('/fav',ensureAuth,favRout);
router.use('/user',userRout);
router.use('/image',imageRout);
module.exports = router;
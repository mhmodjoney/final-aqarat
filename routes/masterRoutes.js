const express = require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');
const authRout =require('./authRout')
// this is a master Rout file to sapret other routes 
router.post('/realestate', realEstateController.getAllRealEstate);
router.post('/auth',authRout);

module.exports = router;

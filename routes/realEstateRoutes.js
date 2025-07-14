const express = require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');

router.post('/realestate', realEstateController.getAllRealEstate);

module.exports = router;

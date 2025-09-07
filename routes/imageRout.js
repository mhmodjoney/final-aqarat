const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadImageController  = require('../controllers/imageController'); // Adjust path as needed
const ensureAuth = require('../middlewares/authMiddleware'); // Adjust path as needed

const upload = multer();

router.post('/upload-image', ensureAuth, upload.single('image'), uploadImageController.uploadImageController);

module.exports = router;
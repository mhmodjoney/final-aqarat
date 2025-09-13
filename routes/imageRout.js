const express = require('express');
const router = express.Router();
const uploadImageController  = require('../controllers/imageController');
const ensureAuth = require('../middlewares/authMiddleware');
const { uploadSingle, validateImage } = require('../middlewares/uploadMiddleware');

router.post('/upload-image', ensureAuth, uploadSingle, validateImage, uploadImageController);

router.use((err, req, res, next) => {
  const multer = require('multer');
  if (err instanceof multer.MulterError) {
    console.log('Multer error:', err);
    return res.status(400).json({ message: 'INVALID_FILE_UPLOAD', code: err.code });
  }
  if (err) {
    return res.status(500).json({ message: 'UPLOAD_ERROR', error: err.message });
  }
  next();
});

module.exports = router;
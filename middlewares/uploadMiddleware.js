const multer = require('multer');

// memory storage (so req.file.buffer is available)
const storage = multer.memoryStorage();

// restrict by mimetype
const fileFilter = (req, file, cb) => {
  if (file && file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // reject silently (no Multer error) -> req.file will be undefined
    cb(null, false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB

const upload = multer({ storage, fileFilter, limits });

// exported middleware: call uploadSingle in route chain
const uploadSingle = upload.single('image');

// validate after multer runs — reject non-image or missing file before controller
const validateImage = (req, res, next) => {
  // if multer rejected fileFilter -> req.file is undefined
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: 'INVALID_FILE_TYPE_OR_MISSING' });
  }
  // optional extra checks
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(400).json({ message: 'INVALID_FILE_TYPE' });
  }
  next();
};

module.exports = {
  uploadSingle,
  validateImage,
};
const uploadImage  = require('../utils/cloudinaryUploade');

const uploadImageController = async (req, res) => {
    try {
        console.log('/upload-image');
        const result = await uploadImage(req.file.buffer);
        return res.status(201).json({ message: 'UPLOAD_SUCCESS', data: result });
    } catch (err) {
        return res.status(500).json({ message: 'UPLOAD_FAILED', error: err.message });
    }
};

module.exports = uploadImageController;
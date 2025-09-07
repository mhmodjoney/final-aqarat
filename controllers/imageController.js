const uploadImage  = require('../utils/cloudinaryUploade');

const uploadImageController = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'NO_FILE' });
        }

        // Optional: Validate file type and size here
        // Optional: Sanitize buffer if needed
        // const safeBuffer = await sanitizeImageBuffer(req.file.buffer);

        const result = await uploadImage(req.file.buffer);

        return res.json({
            url: result.secure_url,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
        });
    } catch (err) {
        return res.status(400).json({ error:err || 'SERVER_ERROR' });
    }
};

module.exports = { uploadImageController };
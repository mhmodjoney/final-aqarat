const cloudinary = require('../config/cloudecfg');

const uploadImage = async (buffer) => {
    return await cloudinary.uploader.upload(buffer, { resource_type: 'auto' });
};

module.exports = { uploadImage };
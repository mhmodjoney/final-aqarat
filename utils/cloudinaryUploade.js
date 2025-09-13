const cloudinary = require('../config/cloudecfg');
const { PassThrough } = require('stream');

const uploadImage = (buffer, options = { resource_type: 'auto' }) => {
    // console.log('Uploading image to Cloudinary...');
    
    return new Promise((resolve, reject) => {
        const passthrough = new PassThrough();
        const uploadStream = cloudinary.uploader.upload_stream(options, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
        passthrough.end(buffer);
        passthrough.pipe(uploadStream);
    });
};


module.exports = uploadImage;
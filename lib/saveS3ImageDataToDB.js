const User = require('../models/User');

const saveS3ImageDataToDB = (email, designation, uuid, result) => new Promise(async (resolve, reject) => {
    console.log('entered save s3 image data to db.');
    try {
        await User.saveS3ImageData(email, designation, uuid, result);
        resolve();
    } catch (e) {
        console.log('error occured in save s3 image data to db.');
        console.log(e);
        reject(e);
    }
});

module.exports = saveS3ImageDataToDB;
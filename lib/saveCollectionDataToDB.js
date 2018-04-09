const User = require('../models/User');

const saveCollectionDataToDB = (email, designation, data) => new Promise(async (resolve, reject) => {

    console.log('entered save collection data to db.');

    try {
        if (!data.FaceRecords) throw new Error('no face found.');
        console.log('collection data : ');
        console.log(JSON.stringify(data.FaceRecords, undefined ,2));

        const faceData = data.FaceRecords[0].Face;
        const faceId = faceData.faceId;
        const imageId = faceData.imageId;
        await User.saveCollectionData(email, designation, faceId, imageId);
        resolve();
    } catch (e) {
        console.log('error occured in save s3 image data to db.');
        console.log(e);
        reject(e);
    }
});

module.exports = saveCollectionDataToDB;
const {rekognition} = require('../config/aws');
const pify = require('pify');

const recognizeFace = (email, designation, uuid) => new Promise((resolve, reject) => {
    const replaced = email.replace(/[@.]/g, '-');

    const params = {
        CollectionId : `${replaced}-user-collection`,
        Image : {
            // Bytes : img
            S3Object : {
                Bucket : process.env.AWS_BUCKET_NAME,
                Name : `${email}/${designation}/${uuid}.jpg`,
            }
        }
    };

    pify(rekognition.searchFacesByImage.bind(rekognition))(params)
        .then(data => {
            console.log('face detected.');
            // console.log(data);

            // check data if there's detected faces.
            // if not, return unknown.
            console.log(data.FaceMatches[0].Face);
            resolve(data.FaceMatches[0].Face.ExternalImageId);

            // resolve(data.FaceMatches[0].Face.ExternalImageId);
            // resolve(data.ExternalImageId);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
});

module.exports = recognizeFace;
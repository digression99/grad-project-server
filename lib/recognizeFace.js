const {rekognition} = require('../config/aws');
const pify = require('pify');

const recognizeFace = (email, img) => new Promise((resolve, reject) => {
    const params = {
        CollectionId : `${email}-user-collection`,
        Image : {
            Bytes : img
            // S3Object : {
            //     Bucket : process.env.AWS_BUCKET_NAME,
            //     Name : "jeonghyun/camera00000001.jpg"
            // }
        }
    };

    pify(rekognition.searchFacesByImage.bind(rekognition))(params)
        .then(data => {
            console.log('face detected.');
            // console.log(data);

            // check data if there's detected faces.
            // if not, return unknown.

            resolve(data.ExternalImageId);
            // resolve(data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
});

module.exports = recognizeFace;
const {rekognition} = require('../../config/aws');
const pify = require('pify');

// const saveImageToCollection - save just one image so I can check if there's face in the image.

const saveImageToCollection = (email, designation, img) => new Promise((resolve, reject) => {

    const params = {
        CollectionId : `${email}-user-collection`,
        ExternalImageId : designation,
        Image : {
            Bytes : img
            // S3Object : {
            //     Bucket : "",
            //     Key : ""
            // }
        }
    };

    pify(rekognition.indexFaces.bind(rekognition))(params)
        .then(data => {
            console.log('index succeed.');
            resolve(data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
});

// const saveImagesToCollection = (email, designation, S3ImageKeys) => {
//     let promiseArr = [];
//
//     for (let key of S3ImageKeys) {
//         // img is s3 key.
//         const params = {
//             CollectionId : `${email}-user-collection`,
//             externalImageId : designation,
//             Image : {
//                 S3Object : {
//                     Bucket : process.env.AWS_BUCKET_NAME,
//                     Name : key
//                 }
//             }
//         };
//         PromiseArr.push(pify(rekognition.indexFaces.bind(rekognition))(params));
//     }
//     return Promise.all(promiseArr);
//     // Promise.all(promiseArr)
//     //     .then(values => {
//     //         resolve(values);
//     //     })
//     //     .catch(err => reject(err));
// };

module.exports = saveImageToCollection;


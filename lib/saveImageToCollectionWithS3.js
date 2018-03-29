const {rekognition, S3} = require('../config/aws');
const pify = require('pify');
// const uuidv4 = require('uuid/v4');


// const saveImageToCollection - save just one image so I can check if there's face in the image.

const saveImageToCollectionWithS3 = (email, designation, uuid) => new Promise(async (resolve, reject) => {

    // parse the email to proper string.
    const replaced = email.replace(/[@.]/g, '-');
    const key = `${replaced}-${designation}-${uuid}`;

    const params = {
        CollectionId : `${replaced}-${designation}-collection`,
        ExternalImageId : designation,
        Image : {
            S3Object : {
                Bucket : process.env.AWS_BUCKET_NAME,
                Key : key
            }
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

module.exports = saveImageToCollectionWithS3;


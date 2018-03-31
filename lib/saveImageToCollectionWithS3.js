const {rekognition} = require('../config/aws');
const pify = require('pify');
// const uuidv4 = require('uuid/v4');


// const saveImageToCollection - save just one image so I can check if there's face in the image.

const saveImageToCollectionWithS3 = (email, designation, uuid) => new Promise(async (resolve, reject) => {

    console.log('save image to collection with s3 entered.');

    try {
        // parse the email to proper string.
        const replaced = email.replace(/[@.]/g, '-');
        const key = `${email}/${designation}/${uuid}.jpg`;

        console.log('key is : ', key);
        console.log('replaced is : ', replaced);


        const params = {
            CollectionId : `${replaced}-${designation}-collection`,
            ExternalImageId : designation,
            Image : {
                S3Object : {
                    Bucket : process.env.AWS_BUCKET_NAME,
                    Name : key
                }
            }
        };

        console.log('params is : ');
        console.log(params);

        const result = pify(rekognition.indexFaces.bind(rekognition))(params);
        console.log('index succeed.');
        resolve(result);
    } catch (e) {
        console.log('error occured in save image to collection with s3.');
        console.log(e);
        reject(e);
    }
});

module.exports = saveImageToCollectionWithS3;


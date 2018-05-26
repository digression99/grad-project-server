const {rekognition} = require('../../config/aws');
const pify = require('pify');

const saveImageToBlacklistCollectionWithS3 = (key) => new Promise(async (resolve, reject) => {

    console.log('save image to blacklist collection with s3 entered.');

    try {
        // parse the email to proper string.
        // const replaced = email.replace(/[@.]/g, '-');
        const key = `${key}.jpg`; // this time, designation is detected.

        console.log('key is : ', key);
        // console.log('replaced is : ', replaced);

        const params = {
            CollectionId : `blacklist-collection`,
            ExternalImageId : 'blacklist',
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
        console.log('saveImageToBlacklistCollectionWithS3 succeed.');
        resolve(result);
    } catch (e) {
        console.log('error occured in saveImageToBlacklistCollectionWithS3');
        console.log(e);
        reject(e);
    }
});

module.exports = saveImageToBlacklistCollectionWithS3;


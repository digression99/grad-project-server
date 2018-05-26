const {S3} = require('../../config/aws');
const pify = require('pify');

const deleteImageInS3 = (key) => new Promise(async (resolve, reject) => {

    console.log('enter delete image in s3');

    try {
        const replaced = email.replace(/[@.]/g, '-');

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${key}.jpg`,
            ACL: 'public-read'
        };

        console.log('params is : ');
        console.log(params);

        await pify(S3.deleteObject.bind(S3))(params);
        resolve();
    } catch (e) {
        console.log('error occured in delete image in S3.');
        console.log(e);
        reject(e);
    }
});

module.exports = deleteImageInS3;
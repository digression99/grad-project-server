const {S3} = require('../../config/aws');
const pify = require('pify');

const saveBlackListImageInS3 = (uuid) => new Promise(async (resolve, reject) => {
    console.log('enter saveBlackListImageInS3');
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `blacklist/${uuid}.jpg`,
            ACL: 'public-read'
        };

        console.log('params is : ');
        console.log(params);

        await pify(S3.putObject.bind(S3))(params);
        resolve();
    } catch (e) {
        console.log('error occured in saveBlackListImageInS3');
        console.log(e);
        reject(e);
    }
});

module.exports = saveBlackListImageInS3;
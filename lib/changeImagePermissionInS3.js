const {S3} = require('../config/aws');
const pify = require('pify');

const changeImagePermissionInS3 = (email, designation, uuid) => new Promise(async (resolve, reject) => {
    try {
        const replaced = email.replace(/[@.]/g, '-');

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${replaced}/${designation}/${uuid}.jpg`,
            ACL: 'public-read'
        };

        const result = await pify(S3.putObjectAcl.bind(S3))(params);
        resolve(result);

        // S3.putObjectAcl(params, function(err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else     console.log(data);           // successful response
        // });
    } catch (e) {
        console.log('error occured.');
        console.log(e);
        reject(e);
    }
})

module.exports = changeImagePermissionInS3;
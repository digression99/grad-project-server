const {S3} = require('../../config/aws');
const uuidv4 = require('uuid/v4');
const pify = require('pify');
// const fs = require('fs');

const saveImageToS3Base64 = (email, designation, image) => new Promise((resolve, reject) => {
    const uuid = uuidv4();

    // image is in buffer.
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key: `${email}/${designation}/${uuid}.jpg`,
        Body : image,
        ContentType: 'image/jpg'
    };

    pify(S3.putObject.bind(S3))(params)
        .then(data => {
            console.log('image saved to s3.');
            resolve({
                data, uuid
            });
        })
        .catch(err => {
            console.error('error occured during saving image to s3');
            reject(err);
        })
    // return pify(S3.putObject.bind(S3))(params);
});

module.exports = saveImageToS3Base64;

// const saveImagesToS3 = (email, designation, images) => {
//
//     // img is not base 64.
//
//
//     const params = {
//         Bucket : process.env.AWS_BUCKET_NAME,
//         Key: `${email}/${designation}/${uuidv4()}.jpg`,
//         Body : images,
//         // Body: fs.createReadStream(images)
//         ContentEncoding: 'base64',
//         ContentType: 'image/jpg'
//     };
//
//     return pify()
//
//     s3Bucket.putObject(data, function(err, data){
//         if (err) {
//             console.log(err);
//             console.log('Error uploading data: ', data);
//         } else {
//             console.log('succesfully uploaded the image!');
//         }
//     });
//
//     // const params = {
//     //     Bucket : process.env.AWS_BUCKET_NAME, // better to use constants
//     //     Key : `${email}/${designation}/${uuidv4()}.jpg`,
//     //     'ACL':'public-read',
//     //     'Body':fs.createReadStream('upload-image.jpg'),
//     //
//     //     'ContentType':'image/jpg'
//     // };
// };
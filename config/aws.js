// Load the SDK and UUID
const AWS = require('aws-sdk');
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION
} = require('../lib/constants');

AWS.config.update({
    accessKeyId : AWS_ACCESS_KEY_ID,
    secretAccessKey : AWS_SECRET_ACCESS_KEY,
    region : AWS_REGION
});

// Create an S3 client
const S3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

console.log('aws setting complete.');

module.exports = {
    S3, rekognition
};
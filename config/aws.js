// Load the SDK and UUID
const AWS = require('aws-sdk');
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_IOT_ENDPOINT
} = require('../lib/constants');

AWS.config.update({
    accessKeyId : AWS_ACCESS_KEY_ID,
    secretAccessKey : AWS_SECRET_ACCESS_KEY,
    region : AWS_REGION
});

// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'IDENTITY_POOL_ID',
//     IdentityId: 'IDENTITY_ID_RETURNED_FROM_YOUR_PROVIDER',
//     Logins: {
//         'cognito-identity.amazonaws.com': 'TOKEN_RETURNED_FROM_YOUR_PROVIDER'
//     }
// });

console.log('in aws config, endpoint is : ', process.env.AWS_IOT_ENDPOINT);

// Create an S3 client
const S3 = new AWS.S3();
const rekognition = new AWS.Rekognition();
const iot = new AWS.Iot();
const iotData = new AWS.IotData({
    endpoint : AWS_IOT_ENDPOINT,
    // accessKeyId : AWS_ACCESS_KEY_ID,
    // secretAccessKey : AWS_SECRET_ACCESS_KEY,
    // region : AWS_REGION
});

console.log('aws setting complete.');

module.exports = {
    S3, rekognition, iot, iotData, AWS
};

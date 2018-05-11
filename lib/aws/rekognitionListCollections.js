const {
    rekognition
} = require('../../config/aws');
const pify = require('pify');

const rekognitionListCollections = () => new Promise(async (resolve, reject) => {
    try {
        console.log('rekognition list collections');
        console.log(process.env.AWS_REGION);
        const result = await pify(rekognition.listCollections.bind(rekognition))({});
        resolve(result.CollectionIds);
    } catch (e) {
        console.log('error occured in rekognition list collections');
        console.log(e);
        reject(e);
    }
});

module.exports = rekognitionListCollections;

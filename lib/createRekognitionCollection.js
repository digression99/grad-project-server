
// const path = require('path');
// const dotenv = require('dotenv');
// const pify = require('pify');
//
// // environment setting
// dotenv.load({path: path.join(__dirname, '../.env.development')});

const {rekognition} = require('../config/aws');
const pify = require('pify');

const rekognitionListCollections = require('./rekognitionListCollections');

const createRekognitionCollection = (email, designation) => new Promise(async (resolve, reject) => {
    console.log('create rekognition collection entered');

    try {
        const replaced = email.replace(/[@.]/g, '-');
        const result = await rekognitionListCollections();

        console.log('list collections.');
        const isInclude = result.includes(`${replaced}-${designation}-collection`);
        if (!isInclude) {
            const params = {
                CollectionId : `${replaced}-${designation}-collection`
            };
            const result = await pify(rekognition.createCollection.bind(rekognition))(params);
            console.log('collection created.');
            console.log(result);
        } else {
            console.log('collection already exists.');
        }
        resolve();
    } catch (e) {
        console.log('error occured.');
        console.log(e);
        reject(e);
        // throw new Error(e);
    }
});

module.exports = createRekognitionCollection;

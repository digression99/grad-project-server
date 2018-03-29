
// const path = require('path');
// const dotenv = require('dotenv');
// const pify = require('pify');
//
// // environment setting
// dotenv.load({path: path.join(__dirname, '../.env.development')});

const {rekognition} = require('../config/aws');
const pify = require('pify');
// require('../config/aws')

const createRekognitionCollection = (email, designation) => new Promise((resolve, reject) => {

    const replaced = email.replace(/[@.]/g, '-');

    const params = {
        CollectionId : `${replaced}-${designation}-collection`
    };

    console.log('create rekognition collection entered.');

    // do I have to return promise or just data?
    pify(rekognition.createCollection.bind(rekognition))(params)
        .then(data => {
            console.log('collection created.');
            resolve(data);
        })
        .catch(err => {
            console.log('error occured during creating collection');
            reject(err);
        });
});

module.exports = createRekognitionCollection;

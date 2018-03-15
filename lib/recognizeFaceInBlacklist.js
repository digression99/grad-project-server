const {rekognition} = require('../config/aws');
const pify = require('pify');

const recognizeFaceInBlacklist = (img) => new Promise((resolve, reject) => {
    const params = {
        CollectionId : 'blacklist-collection',
        Image : {
            Bytes : img
        }
    };

    pify(rekognition.searchFacesByImage.bind(rekognition))(params)
        .then(data => {
            // check data. if there's no face in here, return unknown.
            console.log('blacklist collection data :');
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            console.log('error occured in recognize face in black list.');
            // console.log(err);
            reject(err);
        });
});

module.exports = recognizeFaceInBlacklist;
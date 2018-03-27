const createRekognitionCollection = require('./createRekognitionCollection');
const recognizeFace = require('./recognizeFace');
const saveImageToCollection = require('./saveImageToCollection');
const saveImageToS3 = require('./saveImageToS3');
const recognizeFaceInBlacklist = require('./recognizeFaceInBlacklist');
const constants = require('./constants');
const deleteUserCollection = require('./deleteUserCollection');
const makeGeoQuery = require('./makeGeoQuery');
const createBlacklistCollection = require('./createBlacklistCollection');
const rekognitionListCollections = require('./rekognitionListCollections');

module.exports = {
    constants,
    deleteUserCollection,
    createRekognitionCollection,
    recognizeFace,
    saveImageToCollection,
    saveImageToS3,
    recognizeFaceInBlacklist,
    makeGeoQuery,
    createBlacklistCollection,
    rekognitionListCollections
};
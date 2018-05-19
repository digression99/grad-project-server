// aws wrapper functions.
const createRekognitionCollection = require('./aws/createRekognitionCollection');
const recognizeFace = require('./aws/recognizeFace');
const deleteUserCollection = require('./aws/deleteUserCollection');
const createBlacklistCollection = require('./aws/createBlacklistCollection');
const rekognitionListCollections = require('./aws/rekognitionListCollections');
const saveImageToCollectionWithS3 = require('./aws/saveImageToCollectionWithS3');
const saveCollectionDataToDB = require('./aws/saveCollectionDataToDB');
const changeImagePermissionInS3 = require('./aws/changeImagePermissionInS3');

// firebase wrapper functions.
const makeGeoQuery = require('./firebase/makeGeoQuery');
const sendMobileNotificationToUser = require('./firebase/sendMobileNotificationToUser');
const addGeoLocationToGeoQuery = require('./firebase/addGeoLocationToGeoQuery');
const sendSMSToProtectors = require('./firebase/sendSMSToProtectors');
const sendSMSToUser = require('./firebase/sendSMSToUser');

// google functions.

const getLocationFromAddress = require('./google/getLocationFromAddress');

const constants = require('./constants');

module.exports = {
    getLocationFromAddress,
    sendSMSToUser,
    addGeoLocationToGeoQuery,
    saveCollectionDataToDB,
    constants,
    deleteUserCollection,
    createRekognitionCollection,
    recognizeFace,
    sendMobileNotificationToUser,
    makeGeoQuery,
    changeImagePermissionInS3,
    createBlacklistCollection,
    rekognitionListCollections,
    saveImageToCollectionWithS3
};
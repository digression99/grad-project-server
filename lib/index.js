// aws wrapper functions.
const createRekognitionCollection = require('./aws/createRekognitionCollection');
const recognizeFace = require('./aws/recognizeFace');
const deleteUserCollection = require('./aws/deleteUserCollection');
const createBlacklistCollection = require('./aws/createBlacklistCollection');
const rekognitionListCollections = require('./aws/rekognitionListCollections');
const saveImageToCollectionWithS3 = require('./aws/saveImageToCollectionWithS3');
const saveImageToBlacklistCollectionWithS3 = require('./aws/saveImageToBlacklistCollectionWithS3');
const saveCollectionDataToDB = require('./aws/saveCollectionDataToDB');
const changeImagePermissionInS3 = require('./aws/changeImagePermissionInS3');
const deleteImageInS3 = require('./aws/deleteImageInS3');
const saveBlackListImageInS3 = require('./aws/saveBlackListImageInS3');

// firebase wrapper functions.
const makeGeoQuery = require('./firebase/makeGeoQuery');
const sendMobileNotificationToUser = require('./firebase/sendMobileNotificationToUser');
const addGeoLocationToGeoQuery = require('./firebase/addGeoLocationToGeoQuery');
const sendSMSToProtectors = require('./firebase/sendSMSToProtectors');
const sendSMSToUser = require('./firebase/sendSMSToUser');
const removeGeoLocation = require('./firebase/removeGeoLocation');
const deleteUserInFirebase = require('./firebase/deleteUserInFirebase');

// google functions.

const getLocationFromAddress = require('./google/getLocationFromAddress');

const constants = require('./constants');

module.exports = {
    deleteUserInFirebase,
    saveBlackListImageInS3,
    deleteImageInS3,
    saveImageToBlacklistCollectionWithS3,
    removeGeoLocation,
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
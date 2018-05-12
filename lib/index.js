// aws wrapper functions.
const createRekognitionCollection = require('./aws/createRekognitionCollection');
const recognizeFace = require('./aws/recognizeFace');
const saveImageToCollection = require('./aws/saveImageToCollection');
const saveImageToS3Base64 = require('./aws/saveImageToS3Base64');
const recognizeFaceInBlacklist = require('./aws/recognizeFaceInBlacklist');
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

// obsolete fuctions.
const saveS3ImageDataToDB = require('./saveS3ImageDataToDB');
const getLogData = require('./getLogData');
const updatePhoneNumber = require('./updatePhoneNumber');
const saveUserToDB = require('./saveUserToDB');
const updateToken = require('./updateToken');
const updateUserProfile = require('./updateUserProfile');

const constants = require('./constants');

module.exports = {
    updateUserProfile,
    sendSMSToProtectors,
    updateToken,
    saveUserToDB,
    updatePhoneNumber,
    sendSMSToUser,
    addGeoLocationToGeoQuery,
    getLogData,
    saveCollectionDataToDB,
    saveS3ImageDataToDB,
    constants,
    deleteUserCollection,
    createRekognitionCollection,
    recognizeFace,
    saveImageToCollection,
    saveImageToS3Base64,
    recognizeFaceInBlacklist,
    sendMobileNotificationToUser,
    makeGeoQuery,
    changeImagePermissionInS3,
    createBlacklistCollection,
    rekognitionListCollections,
    saveImageToCollectionWithS3
};
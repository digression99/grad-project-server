const createRekognitionCollection = require('./aws/createRekognitionCollection');
const recognizeFace = require('./aws/recognizeFace');
const saveImageToCollection = require('./aws/saveImageToCollection');
const saveImageToS3Base64 = require('./aws/saveImageToS3Base64');
const recognizeFaceInBlacklist = require('./aws/recognizeFaceInBlacklist');
const constants = require('./constants');
const deleteUserCollection = require('./aws/deleteUserCollection');
const makeGeoQuery = require('./firebase/makeGeoQuery');
const createBlacklistCollection = require('./aws/createBlacklistCollection');
const rekognitionListCollections = require('./aws/rekognitionListCollections');
const saveImageToCollectionWithS3 = require('./aws/saveImageToCollectionWithS3');
const sendMobileNotificationToUser = require('./firebase/sendMobileNotificationToUser');
const changeImagePermissionInS3 = require('./aws/changeImagePermissionInS3');
const saveS3ImageDataToDB = require('./saveS3ImageDataToDB');
const saveCollectionDataToDB = require('./aws/saveCollectionDataToDB');
const getLogData = require('./getLogData');
const addGeoLocationToGeoQuery = require('./firebase/addGeoLocationToGeoQuery');
const sendSMSToUser = require('./firebase/sendSMSToUser');
const updatePhoneNumber = require('./updatePhoneNumber');
const saveUserToDB = require('./saveUserToDB');
const updateToken = require('./updateToken');
const sendSMSToProtectors = require('./firebase/sendSMSToProtectors');
const updateUserProfile = require('./updateUserProfile');

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
const createRekognitionCollection = require('./createRekognitionCollection');
const recognizeFace = require('./recognizeFace');
const saveImageToCollection = require('./saveImageToCollection');
const saveImageToS3Base64 = require('./saveImageToS3Base64');
const recognizeFaceInBlacklist = require('./recognizeFaceInBlacklist');
const constants = require('./constants');
const deleteUserCollection = require('./deleteUserCollection');
const makeGeoQuery = require('./makeGeoQuery');
const createBlacklistCollection = require('./createBlacklistCollection');
const rekognitionListCollections = require('./rekognitionListCollections');
const saveImageToCollectionWithS3 = require('./saveImageToCollectionWithS3');
const sendMobileNotificationToUser = require('./sendMobileNotificationToUser');
const changeImagePermissionInS3 = require('./changeImagePermissionInS3');
const saveS3ImageDataToDB = require('./saveS3ImageDataToDB');
const saveCollectionDataToDB = require('./saveCollectionDataToDB');
const getLogData = require('./getLogData');
const addGeoLocationToGeoQuery = require('./addGeoLocationToGeoQuery');
const sendSMSToUser = require('./sendSMSToUser');
const updatePhoneNumber = require('./updatePhoneNumber');

module.exports = {
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
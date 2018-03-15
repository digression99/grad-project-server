const createRekognitionCollection = require('./createRekognitionCollection');
const recognizeFace = require('./recognizeFace');
const saveImageToCollection = require('./saveImageToCollection');
const saveImageToS3 = require('./saveImageToS3');
const recognizeFaceInBlacklist = require('./recognizeFaceInBlacklist');
const constants = require('./constants');
const testFunc = require('./testFunc');

module.exports = {
    testFunc,
    constants,
    createRekognitionCollection,
    recognizeFace,
    saveImageToCollection,
    saveImageToS3,
    recognizeFaceInBlacklist
};
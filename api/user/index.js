const express = require('express');

const user = express.Router();
const userCtrl = require('./user.ctrl');
const authenticate = require('../../lib/middleware/authenticate');

// user.post('/face-detect', userCtrl.faceDetect);
// user.post('/get-faces', userCtrl.getFaces);

user.post('/register', userCtrl.registerUser);

user.use(authenticate);

user.post('/login', userCtrl.userLogin);

user.post('/profile', userCtrl.getProfile);
user.post('/emergency', userCtrl.handleEmergency);
user.post('/logs', userCtrl.sendLogData);
user.post('/accept-help', userCtrl.handleAcceptHelp);
user.post('/timer-finished', userCtrl.handleTimerFinish);

// location.
user.post('/remove-location', userCtrl.removeLocation);
user.post('/add-location', userCtrl.addLocation);
user.post('/address-check', userCtrl.addressCheck);

// update request.
user.put('/profile', userCtrl.updateProfile);

// delete.
user.delete('/profile', userCtrl.deleteProfile);

// blacklist.
user.post('/blacklist-register', userCtrl.registerBlackList);

// user.put('/profile/token', userCtrl.updateToken);
// user.post('/face-register', userCtrl.faceRegister); // to device
// user.post('/face-detect', userCtrl.faceDetect); // to device

module.exports = user;

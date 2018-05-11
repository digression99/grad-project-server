const express = require('express');

const user = express.Router();
const userCtrl = require('./user.ctrl');

// user.post('/face-detect', userCtrl.faceDetect);
// user.post('/get-faces', userCtrl.getFaces);

user.post('/register', userCtrl.registerUser);
user.post('/face-register', userCtrl.faceRegister); // to device
user.post('/face-detect', userCtrl.faceDetect); // to device
user.post('/profile', userCtrl.getProfile);
user.post('/emergency', userCtrl.handleEmergency);
user.post('/logs', userCtrl.sendLogData);
user.post('/add-location', userCtrl.addLocation);

// update request.
user.put('/profile', userCtrl.updateProfile);

// user.put('/profile/token', userCtrl.updateToken);

module.exports = user;

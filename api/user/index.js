const express = require('express');

const user = express.Router();
const userCtrl = require('./user.ctrl');
const authenticate = require('../../lib/middleware/authenticate');

// user.post('/face-detect', userCtrl.faceDetect);
// user.post('/get-faces', userCtrl.getFaces);

user.post('/register', userCtrl.registerUser);

user.use(authenticate);

user.post('/profile', userCtrl.getProfile);
user.post('/emergency', userCtrl.handleEmergency);
user.post('/logs', userCtrl.sendLogData);
user.post('/add-location', userCtrl.addLocation);
user.post('/accept-help', userCtrl.handleAcceptHelp);

// update request.
user.put('/profile', userCtrl.updateProfile);

// user.put('/profile/token', userCtrl.updateToken);
// user.post('/face-register', userCtrl.faceRegister); // to device
// user.post('/face-detect', userCtrl.faceDetect); // to device

module.exports = user;

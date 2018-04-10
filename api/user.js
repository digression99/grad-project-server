const express = require('express');

const user = express.Router();
const userCtrl = require('./user.ctrl');
// const profile = require('./profile');

// user.use('/profile', profile);

// user.post('/face-detect', userCtrl.faceDetect);
user.post('/register', userCtrl.registerUser);
user.post('/get-faces', userCtrl.getFaces);
user.post('/face-register', userCtrl.faceRegister);
user.post('/face-detect', userCtrl.faceDetect);
user.post('/profile', userCtrl.getProfile);
user.post('/emergency', userCtrl.handleEmergency);
user.post('/logs', userCtrl.sendLogData);

module.exports = user;

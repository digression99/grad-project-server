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

// no get request from server.
// user.get('/profile', userCtrl.getProfile);

// test functions
// user.get('/');

module.exports = user;

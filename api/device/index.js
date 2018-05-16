const express = require('express');

const device = express.Router();
const deviceCtrl = require('./device.ctrl');
const authenticate = require('../../lib/middleware/authenticate');

device.use(authenticate);
device.post('/face-register', deviceCtrl.faceRegister); // to device
device.post('/face-detect', deviceCtrl.faceDetect); // to device

module.exports = device;

const express = require('express');

const device = express.Router();
const deviceCtrl = require('./device.ctrl');

device.post('/face-register', deviceCtrl.faceRegister); // to device
device.post('/face-detect', deviceCtrl.faceDetect); // to device

module.exports = device;

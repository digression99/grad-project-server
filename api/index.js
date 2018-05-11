const express = require('express');
const api = express.Router();
const user = require('./user');
const device = require('./device');

api.use('/user', user);
api.use('/device', device);

module.exports = api;
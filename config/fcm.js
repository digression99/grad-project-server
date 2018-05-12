const FCM = require('fcm-node');

const {
    FIREBASE_CLOUD_MESSAGING_SERVER_KEY
} = require('../lib/constants');
//
// const serverKey = process.env.FIREBASE_CLOUD_MESSAGING_SERVER_KEY;
const fcm = new FCM(FIREBASE_CLOUD_MESSAGING_SERVER_KEY);

module.exports = fcm;

const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_CLOUD_MESSAGING_SERVER_KEY;
const fcm = new FCM(serverKey);

module.exports = fcm;
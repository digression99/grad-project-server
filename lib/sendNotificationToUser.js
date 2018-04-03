const fcm = require('../config/fcm');
const User = require('../models/User');
const pify = require('pify');

const sendMobileNotificationToUser = (email, data) => new Promise(async (resolve, reject) => {
    console.log('entered send mobile notification to user.');
    try {
        // search user and get the token.
        // const clientToken = "";
        const user = await User.findByEmail(email);
        const clientToken = user.clientToken;

        const pushData = {
            to: clientToken,
            notification: {
                title: "Hello Node",
                body: "Tag SHOW_LIST",
                tag: "SHOW_LIST",
                sound: 'default',
                // click_action: "FCM_PLUGIN_ACTIVITY",
                // click_action: ".MainActivity",
                icon: "fcm_push_icon",
                click_action: "OPEN_THIS_ACT"
                // click_action: "SHOW_ACCEPT_LIST"            //
            },
            priority: "high",
            // restricted_package_name: "study.cordova.fcmclient",
            data
            // data: {
            //     num1: 2000,
            //     num2: 3000
            // }
        };

        const response = await pify(fcm.send.bind(fcm))(pushData);
        console.log('push message sent.');
        console.log(response);
    } catch (e) {
        console.log('error occured in send mobile notification to user.');
        console.log(e);
        reject(e);
    }
});

module.exports = sendMobileNotificationToUser;
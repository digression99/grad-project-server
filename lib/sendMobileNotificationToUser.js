const fcm = require('../config/fcm');
const User = require('../models/User');
const pify = require('pify');

const sendMobileNotificationToUser = (email, data) => new Promise(async (resolve, reject) => {
    console.log('entered send mobile notification to user.');
    try {
        // search user and get the token.
        const user = await User.findByEmail(email);
        const clientToken = user.mobile.token;
        // const clientToken = user.clientToken;
        console.log('user token : ');
        console.log(user.clientToken);

        const pushData = {
            to: clientToken,
            priority: "high",
            notification: {
                title: "This is from Kimilsik",
                body: "This is from kimilsik",
                tag: "SHOW_VISITOR",
                sound: 'default',
                // click_action: "FCM_PLUGIN_ACTIVITY",
                // click_action: ".MainActivity",
                icon: "fcm_push_icon",
                click_action: "SHOW_VISITOR",
                data
                // data : {
                //     uuid : data.uuid
                // }
            }
        };

        const response = await pify(fcm.send.bind(fcm))(pushData);
        console.log('push message sent.');
        console.log(response);
        resolve();
    } catch (e) {
        console.log('error occured in send mobile notification to user.');
        console.log(e);
        reject(e);
    }
});

module.exports = sendMobileNotificationToUser;
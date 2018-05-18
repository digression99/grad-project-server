const fcm = require('../../config/fcm');
const User = require('../../models/User');
const pify = require('pify');

const sendMobileNotificationToUser = (email, data, tag, title, message) => new Promise(async (resolve, reject) => {
    console.log('entered send mobile notification to user.');
    console.log('email is : ', email);

    try {
        // search user and get the token.
        const user = await User.findByEmail(email);

        if (!user) {
            throw new Error("no user found.");
        }

        const clientToken = user.mobile.token;

        console.log('user token : ');
        console.log(clientToken);

        const pushData = {
            to: clientToken,
            priority: "high",
            notification: {
                title: title,
                body: message,
                tag: tag,
                sound: 'default',
                // click_action: "FCM_PLUGIN_ACTIVITY",
                // click_action: ".MainActivity",
                icon: "fcm_push_icon",
                // click_action: "SHOW_VISITOR",
            },
            data
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
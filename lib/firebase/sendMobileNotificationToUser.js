// const fcm = require('../../config/fcm');
const { admin } = require('../../config/firebase');
const User = require('../../models/User');
const pify = require('pify');

const sendMobileNotificationToUser = (email, data, tag, title, message) => new Promise(async (resolve, reject) => {
    console.log('entered send mobile notification to user.');
    console.log('email is : ', email);

    try {
        // search user and get the token.
        const user = await User.findByEmail(email);

        if (!user) {
            console.log('no user found user : ', email);
            throw new Error("no user found.");
        }

        const clientToken = user.mobile.token;

        console.log('user token : ');
        console.log(clientToken);

        // for fcm-node.
        // const pushData = {
        //     to: clientToken,
        //     priority: "high",
        //     notification: {
        //         title: title,
        //         body: message,
        //         tag: tag,
        //         sound: 'default',
        //         // click_action: "FCM_PLUGIN_ACTIVITY",
        //         // click_action: ".MainActivity",
        //         icon: "fcm_push_icon",
        //         click_action: "SHOW_VISITOR",
        //     },
        //     data
        // };

        // See documentation on defining a message payload.
        // const message = {
        //     data: {
        //         score: '850',
        //         time: '2:45'
        //     },
        //     notification : {
        //         title : "test from nodejs admin",
        //         body : "test from nodejs admin"
        //     },
        //     token: clientToken
        // };

        // for android.
        const pushData = {
            data,
            // notification : {
            //     title,
            //     body : message,
            //     tag
            // },
            android : {
                notification: {
                    title,
                    body: message,
                    tag
                }
            },
            token : clientToken
            // android : {
            //     data
            // }
        };

        console.log('push data : ');
        console.log(JSON.stringify(pushData, undefined, 2));

        // const response = await pify(fcm.send.bind(fcm))(pushData);
        const resp = await admin.messaging().send(pushData);
        console.log('push message sent.');
        console.log(resp);
        resolve();
    } catch (e) {
        console.log('error occured in send mobile notification to user.');
        console.log(e);
        reject(e);
    }
});

module.exports = sendMobileNotificationToUser;
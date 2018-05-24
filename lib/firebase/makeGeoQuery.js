const path = require('path');
const pify = require('pify');
const GeoFire = require('geofire');
const User = require('../../models/User');

const { firebase } = require('../../config/firebase');

const sendMobileNotificationToUser = require('./sendMobileNotificationToUser');
//
// const {
//     sendMobileNotificationToUser
// } = require('./sendMobileNotificationToUser');

const makeGeoQuery = (email, location) => new Promise(async (resolve, reject) => {

    console.log('make geo query entered.');
    const replaced = email.replace(/[@.]/g, '-');

    try {

        // don't need to put email to this ref.
        const firebaseRef = firebase.database().ref(process.env.FIREBASE_GEO_QUERY_REFERENCE);
        const geoFire = new GeoFire(firebaseRef);

        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);

        console.log('lat : ', lat);
        console.log('lng : ', lng);

        const geoQuery = geoFire.query({
            center : [lat, lng],
            radius : 30000
        });

        let result = [];

        const onKeyEnteredRegistration = geoQuery.on("key_entered", async (key, location) => {
            console.log(`${key} entered the query.`);
            console.log('location is : ');
            console.log(location);
            result.push(location);

            const data = {
                requestedEmail : email,
                lng : location[0],
                lat : location[1]
            };

            const keys = key.split("-");
            const converted = keys[0] + "@" + keys[1] + "." + keys[2];

            try {
                // console.log('user : ');
                // console.log(JSON.stringify(user, undefined, 2));
                await sendMobileNotificationToUser(converted, data, "SHOW_EMERGENCY", "도움 요청", "도움이 필요합니다!");
            } catch (e) {
                throw new Error(e);
            }
            // const user = await User.findByEmail(key);
            // if (user) {
            // }
            // here, you should send the data to the mobile through fcm.
        });

        resolve(result);

        // const onKeyExitedRegistration = geoQuery.on("key_exited", (key, location) => {
        //     console.log(`${key} entered the query.`);
        //     console.log('location is : ');
        //     console.log(location);
        // });
    } catch (e) {
        console.log('error occured in make geo query.');
        console.log(e);
        reject(e);
    }
});

module.exports = makeGeoQuery;
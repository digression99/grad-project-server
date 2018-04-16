const path = require('path');
const pify = require('pify');
const GeoFire = require('geofire');

const firebase = require('../config/firebase');

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

        const geoQuery = geoFire.query({
            center : [location.latitude, location.longitude],
            radius : 300
        });

        let result = [];

        const onKeyEnteredRegistration = geoQuery.on("key_entered", (key, location) => {
            console.log(`${key} entered the query.`);
            console.log('location is : ');
            console.log(location);

            result.push(location);

            // search email by location. with key parsing.

            sendMobileNotificationToUser(email, location);
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
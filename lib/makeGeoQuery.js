const path = require('path');
// const dotenv = require('dotenv');
const pify = require('pify');
const GeoFire = require('geofire');

// environment setting
// dotenv.load({path: path.join(__dirname, '../.env.development')});

const firebase = require('../config/firebase');
const {
    sendMobileNotificationToUser
} = require('../lib/index');

const makeGeoQuery = (email, location) => new Promise(async (resolve, reject) => {

    console.log('make geo query entered.');
    const replaced = email.replace(/[@.]/g, '-');

    try {

        // don't need to put email to this ref.
        const firebaseRef = firebase.database().ref(`-L99Jrrn5YYIce-LoGDm`);
        const geoFire = new GeoFire(firebaseRef);

        const geoQuery = geoFire.query({
            center : location,
            radius : 300
        });

        let result = [];

        const onKeyEnteredRegistration = geoQuery.on("key_entered", (key, location) => {
            console.log(`${key} entered the query.`);
            console.log('location is : ');
            console.log(location);

            result.push(location);
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
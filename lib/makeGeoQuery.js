const path = require('path');
// const dotenv = require('dotenv');
const pify = require('pify');
const GeoFire = require('geofire');

// environment setting
// dotenv.load({path: path.join(__dirname, '../.env.development')});

const firebase = require('../config/firebase');

const makeGeoQuery = (email, location) => new Promise(async (resolve, reject) => {

    console.log('make geo query entered.');

    // don't need to put email to this ref.
    const firebaseRef = firebase.database().ref(`${email}/-L8NF957F9bFgfV3dxfk`);
    const geoFire = new GeoFire(firebaseRef);

    const geoQuery = geoFire.query({
        center : location,
        radius : 300
    });

    const onKeyEnteredRegistration = geoQuery.on("key_entered", (key, location) => {
        console.log(`${key} entered the query.`);
        console.log('location is : ');
        console.log(location);

        // here, you should send the data to the mobile through fcm.
    });

    resolve();

    // const onKeyExitedRegistration = geoQuery.on("key_exited", (key, location) => {
    //     console.log(`${key} entered the query.`);
    //     console.log('location is : ');
    //     console.log(location);
    // });
});

module.exports = makeGeoQuery;
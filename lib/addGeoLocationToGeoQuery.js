// 37.540382, 127.081306

const GeoFire = require('geofire');
const firebase = require('../config/firebase');

const addGeoLocationToGeoQuery = (email, location) => new Promise(async (resolve, reject) => {

    console.log('enter add geo location to geo query');

    try {
        // add location to geo query.
        const replaced = email.replace(/[@.]/g, '-');
        const loc = [location.latitude, location.longitude];
        console.log('replaced : ', replaced);
        console.log('loc : ');
        console.log(loc);

        const firebaseRef = firebase.database().ref(process.env.FIREBASE_GEO_QUERY_REFERENCE);
        const geoFire = new GeoFire(firebaseRef);
        await geoFire.set(replaced, loc); // location : [lat, lng]
        console.log('set complete.');
        resolve();
    } catch (e) {
        console.log('error in add geo location to geo query');
        reject(e);
    }
});

module.exports = addGeoLocationToGeoQuery;

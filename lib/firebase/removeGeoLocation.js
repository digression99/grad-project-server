const GeoFire = require('geofire');
const {firebase} = require('../../config/firebase');

const removeGeoLocation = (email) => new Promise(async (resolve, reject) => {
    console.log('enter remove geo location.');
    try {
        const replaced = email.replace(/[@.]/g, '-');
        const firebaseRef = firebase.database().ref(process.env.FIREBASE_GEO_QUERY_REFERENCE);
        const geoFire = new GeoFire(firebaseRef);
        await geoFire.remove(replaced);

        resolve();
    } catch (e) {
        console.log('error in remove geo location.');
        console.log(e);
        reject(e);
    }
});

module.exports = removeGeoLocation;

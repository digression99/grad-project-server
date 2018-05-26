const GeoFire = require('geofire');
const { firebase } = require('../../config/firebase');

const sendMobileNotificationToUser = require('./sendMobileNotificationToUser');

const makeGeoQuery = (email, location) => new Promise(async (resolve, reject) => {

    console.log('make geo query entered.');

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

        geoQuery.on("key_entered", async (key, location) => {
            console.log(`${key} entered the query.`);
            console.log('location is : ');
            console.log(location);
            result.push(location);

            const data = {
                requestedEmail : email,
                lng : JSON.stringify(location[0]),
                lat : JSON.stringify(location[1])
            };

            const keys = key.split("-");
            const converted = keys[0] + "@" + keys[1] + "." + keys[2];

            try {
                await sendMobileNotificationToUser(converted, data, "SHOW_EMERGENCY", "도움 요청", "도움이 필요합니다!");
            } catch (e) {
                throw new Error(e);
            }
        });

        resolve(result);
    } catch (e) {
        console.log('error occured in make geo query.');
        console.log(e);
        reject(e);
    }
});

module.exports = makeGeoQuery;
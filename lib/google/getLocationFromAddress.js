
const googleMapsClient = require('../../config/google');

const getLocationFromAddress = (address) => new Promise(async (resolve, reject) => {
    console.log('enter get location from address');
    try {
        const response = await googleMapsClient.geocode({address}).asPromise();

        const res = response.json.results;

        if (!res) throw new Error("invalid address.");

        const loc = res[0].geometry;
        console.log('loc : ');
        console.log(JSON.stringify(loc.location, undefined, 2));
        resolve(loc.location);
    } catch (e) {
        console.log('error occured in get location from address.');
        console.log(e);
        reject(e);
    }
});

module.exports = getLocationFromAddress;
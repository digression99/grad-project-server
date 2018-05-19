
const {
    GOOGLE_API_SERVER_KEY
} = require('../lib/constants');

const googleMapsClient = require('@google/maps').createClient({
    key: GOOGLE_API_SERVER_KEY,
    Promise: Promise
});

module.exports = googleMapsClient;
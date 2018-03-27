const {rekognition} = require('../config/aws');
const pify = require('pify');

const createBlacklistCollection = () => new Promise(async (resolve, reject) => {
    try {
        const params = {CollectionId : `blacklist-collection`};
        console.log('making blacklist collection');
        const result = await pify(rekognition.createCollection.bind(rekognition))(params);
        resolve(result);
    } catch (e) {
        console.log('error occured in create blacklist collection');
        console.log(e);
        reject(e);
    }
});

module.exports = createBlacklistCollection;

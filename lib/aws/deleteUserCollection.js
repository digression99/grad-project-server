const {rekognition} = require('../../config/aws');
const pify = require('pify');

const deleteUserCollection = (email) => new Promise(async (resolve, reject) => {

    console.log('enter deleteUserCollection');
    try {
        const replaced = email.replace(/[@.]/g, '-');

        const params = {
            CollectionId : `${replaced}-user-collection`
        };

        await pify(rekognition.deleteCollection.bind(rekognition))(params);

        console.log('success deleteUserCollection');
        resolve();

    } catch (e) {
        console.log('error occured in deleteUserCollection');
        console.log(e);
        reject(e);
    }
});

module.exports = deleteUserCollection;

const {rekognition} = require('../../config/aws');
const pify = require('pify');

const deleteUserCollection = (email) => new Promise((resolve, reject) => {

    const params = {
        CollectionId : `${email}-user-collection`
    };

    console.log('delete user collection entered.');

    pify(rekognition.deleteCollection.bind(rekognition))(params)
        .then(data => {
            console.log('collection deleted.');
            resolve(data);
        })
        .catch(err => {
            console.log('error occured while deleting collection');
            console.log(err);
            reject(err);
        });
});

module.exports = deleteUserCollection;

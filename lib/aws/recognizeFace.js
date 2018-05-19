const {rekognition} = require('../../config/aws');
const pify = require('pify');

const recognizeFace = (email, designation, uuid) => new Promise(async (resolve, reject) => {
    const replaced = email.replace(/[@.]/g, '-');

    const paramsUserCollection = {
        CollectionId : `${replaced}-user-collection`,
        Image : {
            S3Object : {
                Bucket : process.env.AWS_BUCKET_NAME,
                Name : `${replaced}/${designation}/${uuid}.jpg`,
            }
        }
    };

    const paramsBlacklistCollection = {
        CollectionId : `blacklist-collection`,
        Image : {
            S3Object : {
                Bucket : process.env.AWS_BUCKET_NAME,
                Name : `${replaced}/${designation}/${uuid}.jpg`,
            }
        }
    };

    try {
        const resultUserCollection = await pify(rekognition.searchFacesByImage.bind(rekognition))(paramsUserCollection);
        // console.log("result : ");
        // console.log(result);
        const facesUserCollection = resultUserCollection.FaceMatches;
        console.log("faces : ");
        console.log(facesUserCollection);

        if (facesUserCollection.length === 0) {
            // search in blacklist collection.
            const resultBlacklistCollection = await pify(rekognition.searchFacesByImage.bind(rekognition))(paramsBlacklistCollection);
            const facesBlacklistCollection = resultBlacklistCollection.FaceMatches;
            if (facesBlacklistCollection.length === 0) {
                resolve("unknown");
            } else {
                console.log('blacklist found.');
                resolve("blacklist");
            }
        } else {
            console.log(facesUserCollection[0].Face);
            resolve(facesUserCollection[0].Face.ExternalImageId);
        }
    } catch (e) {
        console.log('error occured in recognize face.');
        console.log(e);
        reject(e);
    }
});

module.exports = recognizeFace;
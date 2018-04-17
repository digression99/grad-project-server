const {rekognition} = require('../config/aws');
const pify = require('pify');

const recognizeFace = (email, designation, uuid) => new Promise(async (resolve, reject) => {
    const replaced = email.replace(/[@.]/g, '-');

    const params = {
        CollectionId : `${replaced}-user-collection`,
        Image : {
            S3Object : {
                Bucket : process.env.AWS_BUCKET_NAME,
                Name : `${replaced}/${designation}/${uuid}.jpg`,
            }
        }
    };

    try {
        const result = await pify(rekognition.searchFacesByImage.bind(rekognition))(params);
        console.log("result : ");
        console.log(result);
        const faces = result.FaceMatches;
        console.log("faces : ");
        console.log(faces);

        if (faces.length === 0) {
            // search in blacklist collection.
            // if (!faces) throw new Error("no face");
            resolve("unknown");
        }

        console.log(faces[0].Face);
        resolve(faces[0].Face.ExternalImageId);
    } catch (e) {
        console.log('error occured in recognize face.');
        console.log(e);
        reject(e);
    }
});

module.exports = recognizeFace;
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

        const faces = result.FaceMatches;

        if (!faces) {
            // search in blacklist collection.
            resolve();
        }

        if (!faces) throw new Error("no face");

        console.log(data.FaceMatches[0].Face);
        resolve(data.FaceMatches[0].Face.ExternalImageId);
    } catch (e) {
        console.log('error occured in recognize face.');
        console.log(e);
        reject(e);
    }
        //
        //
        // .then(data => {
        //     console.log('face detected.');
        //     // console.log(data);
        //
        //     // check data if there's detected faces.
        //     // if not, return unknown.
        //
        //     // resolve(data.FaceMatches[0].Face.ExternalImageId);
        //     // resolve(data.ExternalImageId);
        // })
        // .catch(err => {
        //     console.log(err);
        //     reject(err);
        // });
});

module.exports = recognizeFace;
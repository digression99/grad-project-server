const User = require('../models/User');
const {
    createRekognitionCollection,
    recognizeFace,
    saveImageToCollection,
    saveImageToS3,
    recognizeFaceInBlacklist,
    makeGeoQuery
} = require('../lib/index');

exports.registerUser = async (req, res) => {

    const {email, password} = req.body;

    const user = new User({
        email,
        password
    });

    try {
        await user.save();
        res.status(200).json({
            message : "registerUser",
            user
        });
    } catch (e) {
        res.status(400).json({
            message : e
        });
    }
};

exports.getFaces = (req, res) => {
    res.status(200).json({
        message : "getFaces"
    })
};

exports.faceRegister = async (req, res) => {
    const {email, designation, faceData} = req.body;
    // face data is images, base64.

    console.log('face register entered.');
    console.log("email is : ", email);
    // console.log("constant : ", constants.TEST);
    let uuidArr = [];

    try {
        // should create collection first.
        // username 찾기.
        const splitted = email.split('@');

        await createRekognitionCollection(splitted[0]);
        // console.log();
        console.log('collection created.');

        // can this be ok with several images?
        for (let img of faceData) {
            // first, should change base64 to normal image.
            // but, don't do the business logic in here, just send base64 image to function.
            // or not.
            const decoded = new Buffer.from(img, 'base64');
            // upload image to S3.
            const S3SaveResult = await saveImageToS3(email, designation, decoded);
            console.log('s3 save result : ', S3SaveResult);
            // if upload is finished, use save image to collection to designated
            const saveCollectionResult = await saveImageToCollection(splitted[0], designation, decoded);
            console.log('collection save result : ', saveCollectionResult);

            uuidArr.push(S3SaveResult.uuid);
        }

        res.status(200).json({
            message : "faceRegister complete.",
            uuidArr
        });
    } catch (e) {
        console.log('error occured.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.faceDetect = async (req, res) => {
    const {email, img} = req.body;
    const splitted = email.split("@");
    console.log('face detect entered.');

    try {
        // get image from the buffer.
        console.log('before decoded.');

        const decoded = new Buffer.from(img, 'base64');
        const result = await recognizeFace(splitted[0], decoded);

        console.log('recognize face success.');

        if (result === 'unknown') {
            // should use different function.
            const blackListResult = await recognizeFaceInBlacklist(decoded);


            if (blackListResult === 'unknown') {
                res.status(200).json({
                    message : "stranger"
                });
            } else {
                res.status(200).json({
                    message : "blacklist"
                });
            }
        }
        res.status(200).json({
            message : result
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.getProfile = async (req, res) => {
    const email = req.body.email;
    // no email here, since it's get request.

    try {
        const user = await User.findByEmail(email);

        res.status(200).json({
            email : user.email,
            password : user.password
        });
    } catch (e) {
        console.log(e);

        res.status(400).json({
            message : e
        });
    }
};

exports.handleEmergency = async (req, res) => {

    // get data from req body.
    const {email, location} = req.body;

    const resString = email.replace(/[.@]/g, '-');
    console.log("res :", resString);

    console.log('handle emergency.');
    console.log('email is : ', email);

    // make query. this to library func.
    await makeGeoQuery(resString, location);
    // console.log("query : ", query);

    res.status(200).json({
        message : "handle emergency"
    });
};
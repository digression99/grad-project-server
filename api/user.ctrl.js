const User = require('../models/User');
const {
    createRekognitionCollection,
    recognizeFace,
    makeGeoQuery,
    saveImageToCollectionWithS3
} = require('../lib/index');

exports.registerUser = async (req, res) => {

    const {email, password, token} = req.body;

    const user = new User({
        email,
        password,
        mobile : {
            token
        }
    });

    try {
        await user.save();
        res.status(200).json({
            message : "registerUser succeed.",
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
    // const {email, designation, faceData} = req.body;
    // face data is images, base64.

    const {email, designation, uuid} = req.body;

    console.log('face register entered.');
    console.log("email is : ", email);

    try {
        // create rekognition collection.
        // save image to collection with proper designation.
        // send the result to device.

        await createRekognitionCollection(email);

        for (let id of uuid) {
            const saveCollectionResult = await saveImageToCollectionWithS3(email, designation, id);

            // if data has returned, you need to save it to database.
            // save faceIds, imageIds.

            // saveCollectionData.

            console.log(`${id} is saved to collection`);
            console.log(saveCollectionResult);
        }
        console.log('face register succeed.');
        res.status(200).json({
            message : "succeed."
        });
    } catch (e) {
        console.log('error occured in face register.');
        console.log(e);
        res.status(400).json({
            message : "error occured.",
            error : e
        });
    }
};

exports.faceDetect = async (req, res) => {
    // const {email, img} = req.body;
    const {email, designation, uuid} = req.body;

    // const replaced = email.replace(/[@.]/g, '-');
    console.log('face detect entered.');

    try {
        const result = await recognizeFace(email, designation, uuid);
        res.status(200).json({
            message : result,
        });

    } catch (e) {
        console.log('error occured.');
        console.log(e);
        res.status(400).json({
            message : "error occured.",
            error : e
        });
    }
};

exports.getProfile = async (req, res) => {
    const email = req.body.email;
    // no email here, since it's get request.

    try {
        const user = await User.findByEmail(email);
        if (!user) throw new Error("no user found");

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
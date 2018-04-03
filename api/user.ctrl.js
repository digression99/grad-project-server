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
    const {email, designation, uuid} = req.body;

    console.log('face register entered.');
    console.log("email is : ", email);

    try {
        // create rekognition collection.
        // save image to collection with proper designation.
        // send the result to device.

        if (!email) throw new Error("no email provided.");
        if (!designation) throw new Error("no designation provided.");
        if (!uuid) throw new Error("no uuid provided.");

        await createRekognitionCollection(email);
        // androidprojectapp-userfiles-mobilehub-1711223959
        // androidprojectapp-userfiles-mobilehub-1711223959

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
        if (!result) {
            // no user found.
            // black list check.
            res.status(200).json({
                message : "unknown"
            });
            return;
        }

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
    try {
        // get data from req body.
        const {email, current_location, locations} = req.body;

        console.log("email is : ", email);
        console.log('current location : ');
        console.log(current_location);

        console.log('locations : ');
        console.log(locations);
        // make query. this to library func.
        const result = await makeGeoQuery(email, current_location);

        res.status(200).json({
            message : result
        } );

    } catch (e) {
        console.log('error occured.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};
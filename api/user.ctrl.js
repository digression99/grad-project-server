const User = require('../models/User');
const {
    createRekognitionCollection,
    recognizeFace,
    makeGeoQuery,
    saveImageToCollectionWithS3,
    changeImagePermissionInS3,
    saveS3ImageDataToDB,
    saveCollectionDataToDB,
    sendMobileNotificationToUser,
    getLogData,
    addGeoLocationToGeoQuery
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

        if (!email) throw new Error("no email provided.");
        if (!designation) throw new Error("no designation provided.");
        if (!uuid) throw new Error("no uuid provided.");

        await createRekognitionCollection(email);

        for (let id of uuid) {
            // await
            await changeImagePermissionInS3(email, designation, id);
            const saveCollectionResult = await saveImageToCollectionWithS3(email, designation, id);
            // data save to mongo db.
            await saveCollectionDataToDB(email, designation, saveCollectionResult);
            await saveS3ImageDataToDB(email, designation, id);

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

        console.log("result is : ");
        console.log(result);

        // fcm -> send message.
        await sendMobileNotificationToUser(email, {
            // result,
            uuid
        });

        if (result === "unknown") {
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
        console.log('geo query result is : ');
        console.log(result);

        // send last location to parent.
        const url = `https://www.google.com/maps/search/?api=1&query=${current_location.latitude},${current_location.longitude}`;
        await sendSMSToUser('+821099177190', `사용자가 위급합니다. 위치 :${url}`);

        res.status(200).json({
            message : result
        });

    } catch (e) {
        console.log('error occured.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.sendLogData = async (req, res) => {
    // if the client send the request for the log,
    // then you need to find the uuids of recent photos and send it to the client.
    // first, send uuid and last, send the timestamp, or both.

    const {
        email,
        duration
    } = req.body;

    try {
        const result = await getLogData(email, duration);
        res.status(200).json({
            result
        });
    } catch (e) {
        console.error('send log data');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.addLocation = async(req, res) => {

    const {
        email,
        location
    } = req.body;

    try {
        if (!email) throw new Error("email required.");
        if (!location) throw new Error("location required.");
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lng);

        await addGeoLocationToGeoQuery(email, {
            latitude,
            longitude
        });

        res.status(200).json({
            message : "geo location succeed.",
            email,
            location
        });
    } catch (e) {
        console.log('error add location.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

const User = require('../../models/User');
const {
    makeGeoQuery,
    addGeoLocationToGeoQuery,
    sendSMSToUser,
    sendMobileNotificationToUser,
    getLocationFromAddress
} = require('../../lib/index');

exports.userLogin = async (req, res) => {
    console.log('enter user login.');
    try {
        const {
            email,
            token
        } = req.body;

        const data = {
            mobile : {
                token
            }
        };

        // refresh token.
        await User.findByEmailAndUpdateUser(email, data);
        res.status(200).json({
            message : "user login succeed."
        });
    } catch (e) {
        console.error('error occured in user login');
        console.error(e);
        res.status(400).json({
            message : "user login succeed.",
            error : e
        });
    }
};

exports.registerUser = async (req, res) => {

    const {email, password, token, countryCode} = req.body;
    console.log("data found.");
    console.log("email : ", email);
    console.log("password : ", password);
    console.log("token : ", token);

    try {
        const user = await User.findByEmail(email);
        if (user) {
            res.status(400).json({
                message : "user already exists",
                email
            });
        }
        if (!email || !password || !token) throw new Error('no data accepted.');

        await User.createUser(email, password, token, countryCode);

        console.log('create user succeed.');

        res.status(200).json({
            message : "registerUser succeed.",
            email
        });
    } catch (e) {
        console.log('error occured in register user.');
        console.log(e);
        res.status(400).json({
            message : e
        });
    }
};

exports.getProfile = async (req, res) => {
    const email = req.body.email;
    // no email here, since it's get request.

    try {
        const user = await User.findByEmail(email);
        if (!user) throw new Error("no user found");

        const data = {
            email : user.email,
            password : user.password,
            protector : {
                phoneNumber : user.protector.phoneNumber,
                name : user.protector.name
            },
            mobile : {
                phoneNumber : user.mobile.phoneNumber
            },
            deviceId : user.deviceId,
            address : user.address
        };

        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message : e
        });
    }
};

exports.handleEmergency = async (req, res) => {

    console.log('enter handle emergency.');
    try {
        // get data from req body.
        const {email, current_location, locations} = req.body;

        console.log("email is : ", email);
        // console.log('current location : ');
        // console.log(current_location);
        // console.log('locations : ');
        // console.log(locations);

        const result = await makeGeoQuery(email, current_location);
        console.log('geo query result is : ');
        console.log(result);

        // send last location to parent.
        const url = `https://www.google.com/maps/search/?api=1&query=${current_location.latitude},${current_location.longitude}`;
        // await sendSMSToProtectors(email, url);

        if (!req.user.protector) {
            res.status(400).json({
                message : "no protector registered."
            });
        } else {
            const protectorPhoneNumber = req.user.protector.phoneNumber;

            // should fix later. country code not matched.
            const protectorCountryCode = req.user.mobile.countryCode;
            await sendSMSToUser(protectorPhoneNumber, url, protectorCountryCode);

            res.status(200).json({
                message : result
            });
        }
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

    console.log('enter send log data');

    const {
        email,
        duration
    } = req.body;

    console.log('email : ', email);
    console.log('duration : ', duration);

    try {
        const result = await User.getLogDataWithDuration(email, duration);
        // const result = await getLogData(email, duration);
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

exports.updateProfile = async (req, res) => {
    console.log('entered update profile.');
    try {
        const {
            email,
            data
        } = req.body;

        console.log('received data : ');
        console.log(JSON.stringify(data, undefined, 2));

        await User.findByEmailAndUpdateUser(email, data);

        res.status(200).json({
            message : "update succeed.",
            email
        });
    } catch (e) {
        console.log('error occured in update profile.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.handleAcceptHelp = async (req, res) => {
    console.log('enter handle accept help');
    try {
        const {
            requestedEmail,
            acceptedEmail
        } = req.body;

        await sendMobileNotificationToUser(requestedEmail,
            {acceptedEmail},
            "SHOW_ACCEPT_HELP",
            "도움 수락",
            "도움 요청을 수락하였습니다.");

        res.status(200).json({
            message : "handle accept help succeed."
        });
    } catch (e) {
        console.log('error occured in handle accept help.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.addressCheck = async (req, res) => {
    console.log('enter address check.');
    try {
        const {
            address,
            email
        } = req.body;

        const result = await getLocationFromAddress(address);
        await addGeoLocationToGeoQuery(email, {longitude : result.lng, latitude : result.lat});

        User.findByEmailAndUpdateUser(email, {address});

        res.status(200).json({
            message : "address check succeed.",
            email
        });
    } catch (e) {
        console.log('error occured in address check.');
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};

exports.fcmTest = async (req, res) => {
    console.log('fcm test');
    const {email} = req.body;

    try {
        await sendMobileNotificationToUser(email, {testData : "TEST DATA"}, 'SHOW_USER', "title", "message");

        res.status(200).json({
            message : "fcm test succeed.",
            email
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error : e
        });
    }
};
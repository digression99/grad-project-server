
const {
    createRekognitionCollection,
    recognizeFace,
    saveImageToCollectionWithS3,
    changeImagePermissionInS3,
    saveS3ImageDataToDB,
    saveCollectionDataToDB,
    sendMobileNotificationToUser,
} = require('../../lib');

const User = require('../../models/User');
const Device = require('../../models/Device');

exports.getUserEmail = async (req, res) => {
    const {id} = req.body;
    try {
        const device = await Device.findDeviceById(id);
        if (!device) {
            throw new Error('invalid device id');
        }

        if (!device.email) {
            throw new Error('device not registered');
        }
        res.status(200).json({
            message : "get user email succeed.",
            email : device.email
        });
    } catch (e) {
        res.status(400).json({
            message : "get user email error occured.",
            error : e
        });
    }
};

exports.createDevice = async (req, res) => {
    const {id, endpoint} = req.body;

    try {
        const device = new Device({
            deviceId : id,
            awsEndpoint : endpoint
        });
        await device.save();
        res.status(200).json({
            message : "create device succeed."
        });
    } catch (e) {
        res.status(400).json({
            message : "create device error occured.",
            error : e
        });
    }
};

exports.registerDevice = async (req, res) => {
    const {email, deviceId} = req.body;
    console.log('enter register device.');
    try {
        if (!deviceId) throw new Error("no device id provided.");
        const device = await Device.findDeviceById(deviceId);
        if (!device) throw new Error("invalid device id");

        const user = await User.findByEmail(email);
        if (!user) throw new Error("user not registered.");

        user.deviceId = deviceId;
        device.email = email;

        await user.save();
        await device.save();

        res.status(200).json({
            message : "register device succeed.",
            email
        });
    } catch (e) {
        res.status(400).json({
            message : "error occured.",
            error : e
        });
    }
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

            await User.saveS3ImageData(email, designation, id, 'user');
            // await saveS3ImageDataToDB(email, designation, id, 'user');

            console.log(`${id} is saved to collection`);
            console.log(saveCollectionResult);
        }

        console.log('face register succeed.');

        res.status(200).json({
            message : "face register succeed."
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

    console.log('face detect entered.');
    console.log('email : ', email);
    console.log('designation : ', designation);
    console.log('uuid : ', uuid);

    try {
        const result = await recognizeFace(email, designation, uuid);

        // console.log("result is : ");
        // console.log(result);

        let tag = "";
        let title = "";
        let message = "";

        switch (result) {
            case 'user':
            case 'detected':
                tag = "SHOW_USER";
                title = "사용자 귀가";
                message = "사용자가 귀가했습니다.";
                break;
            case 'friend':
                tag = "SHOW_VISITOR";
                title = "친구 방문";
                message = "친구가 방문했습니다.";
                break;
            default :
                tag = "SHOW_VISITOR";
                title = "외부인 탐지";
                message = "외부인이 방문했습니다.";
        }

        await sendMobileNotificationToUser(email, {result, uuid}, tag, title, message);
        await User.saveS3ImageData(email, designation, uuid, result);
        // await saveS3ImageDataToDB(email, designation, uuid, result);
        res.status(200).json({
            message : result
        });
    } catch (e) {
        console.log('error occured in face detect.');
        console.log(e);
        res.status(400).json({
            message : "error occured in face detect.",
            error : e
        });
    }
};
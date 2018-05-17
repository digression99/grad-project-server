
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

        switch (result) {
            case 'unknown':
                await sendMobileNotificationToUser(email,
                    {result, uuid},
                    "SHOW_VISITOR",
                    "외부인 탐지",
                    "외부인이 방문했습니다.");
                break;
            case 'user':
            case 'detected':
                await sendMobileNotificationToUser(email,
                    {result, uuid},
                    "SHOW_USER",
                    "사용자 귀가",
                    "사용자가 귀가했습니다.");
                break;
            case 'friend':
                await sendMobileNotificationToUser(email,
                    {result, uuid},
                    "SHOW_VISITOR",
                    "친구 방문",
                    "친구가 방문했습니다.");
                break;
        }
        await User.saveS3ImageData(email, designation, uuid, result);
        // await saveS3ImageDataToDB(email, designation, uuid, result);
        res.status(200).json({
            message : result,
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
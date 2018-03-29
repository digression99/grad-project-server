const mongoose = require('../config/mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    S3 : [{
        key : String, // image key. uuid.
        timestamp : Number
    }],
    // not using it now.
    // you know the collection id. it's email.
    rekognition : [{ // for deletion.
        faceId : String,
        imageIds : [String]
    }],
    mobile : {
        token : String
    },
    device : {
        id : String,
    }
});

UserSchema.statics.findByEmail = async function (email) {
    const User = this;
    return await User.findOne({email});

    // return User.findOne({email}).then((user) => {
    //     if (!user) throw new Error("no user found.");
    //     resolve(user);
    // })
    //     .catch(err => reject(err));
};

UserSchema.statics.saveS3ImageData = async function (email, uuid, designation) {
    const User = this;
    const timestamp = moment(); // here, you check the time stamp and save it.
    const replaced = email.replace(/[@.]/g, '-');
    const key = `${replaced}-${designation}-${uuid}`;

    try {
        const user = await User.findOne({email});
        await user.S3.push({
            key,
            timestamp
        });
    } catch (e) {
        console.log('error occured in save s3 image data');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.findByEmailAndUpdateS3 = async function (body) {
    const User = this;
    const {email, S3Data} = body;
    const query = {email};
    const update = {S3 : S3Data};

    return await User.findOneAndUpdate(query, update).exec();
};

UserSchema.statics.findByEmailAndUpdateRekognition = async function (body) {
    const User = this;
    const {email, rekognitionData} = body;
    const query = {email};
    const update = {rekognition : rekognitionData};

    return await User.findOneAndUpdate(query, update).exec();
};

module.exports = mongoose.model('user', UserSchema);
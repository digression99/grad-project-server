const mongoose = require('../config/mongoose');

// mongoose.Schema

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
        key : String, // image key.
        timestamp : Number
    }],
    // not using it now.
    // you know the collection id. it's email.
    rekognition : [{
        faceId : String,
        imageIds : [String]
    }]
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
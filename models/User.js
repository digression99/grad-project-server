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
        imageId : String,
        designation : String
    }],
    mobile : {
        token : {
            type : String,
            // required : true
        },
    },
    device : {
        id : String,
    }
});

UserSchema.statics.getLogDataWithDuration = async function(email, duration ) {
    const User = this;
    try {
        const data = await User.findOne({email}).select('S3');
        if (!user) throw new Error('no user found');
        // find data.

        return data.filter(val => val.timestamp > duration);
    } catch (e) {
        console.log('error occured in get log data with duration.');
        console.log(e);


    }
};

UserSchema.statics.findByEmail = async function (email) {
    const User = this;
    try {
        const user = await User.findOne({email});
        // console.log('user : ');
        // console.log(user);
        return user;
        // resolve(user);
    } catch (e) {
        console.log('error occred in find by email.');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.saveCollectionData = async function (email, designation, faceId, imageId) {
    const User = this;
    try {
        const user = await User.findOne({email});
        await user.rekognition.push({
            faceId, imageId, designation
        });
        await user.save();
    } catch (e) {
        console.log('error occured in save collection data.');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.findByEmailAndUpdateClientToken = async function (email, clientToken) {
    const User = this;
    const query = {email};
    const update = {
        mobile : {
            token : clientToken
        }
    };
    return await User.findOneAndUpdate(query, update).exec();
};

UserSchema.statics.saveS3ImageData = async function (email, designation, uuid) {
    const User = this;
    const timestamp = moment().valueOf(); // here, you check the time stamp and save it.
    const replaced = email.replace(/[@.]/g, '-');
    const key = `${replaced}/${designation}/${uuid}`;

    try {
        const user = await User.findOne({email});
        user.S3.push({
            key,
            timestamp
        });
        await user.save();
    } catch (e) {
        console.log('error occured in save s3 image data');
        console.log(e);
        throw new Error(e);
    }
};

// UserSchema.statics.get

UserSchema.statics.findByEmailAndUpdateS3 = async function (body) {
    const User = this;
    const {email, S3Data} = body;
    const query = {email};
    const update = {S3 : S3Data};

    return await User.findOneAndUpdate(query, update).exec();
};

UserSchema.statics.findLogData = async function (email) {
    const User = this;
    const user = User.findOne({email});
    const query = {
        timestamp : moment().valueOf()
    };

    const result = await User.find(query).select('S3').exec();
}

UserSchema.statics.findByEmailAndUpdateRekognition = async function (body) {
    const User = this;
    const {email, rekognitionData} = body;
    const query = {email};
    const update = {rekognition : rekognitionData};

    return await User.findOneAndUpdate(query, update).exec();
};

// UserSchema.statics.saveS3Image

module.exports = mongoose.model('user', UserSchema);
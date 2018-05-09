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
    protector : {
        phoneNumber : String,
        name : String
    },
    rekognition : [{ // for deletion.
        faceId : String,
        imageId : String,
        designation : String
    }],
    mobile : {
        phoneNumber : String,
        token : {
            type : String,
            // required : true
        },
    },
    device : {
        id : String,
    }
});

UserSchema.statics.getLogDataWithDuration = async function(email, duration) {
    const User = this;
    console.log('enter get log data with duration.');
    try {
        const data = await User.findOne({email}).select('S3').exec();
        console.log(data);
        if (!data) throw new Error('no user found');

        return data.S3.filter(val => val.timestamp > duration)
            .map(dat => ({
                key : dat.key,
                timestamp : dat.timestamp
            }))
    } catch (e) {
        console.log('error occured in get log data with duration.');
        console.log(e);
    }
};

UserSchema.statics.findByEmail = async function (email) {
    const User = this;
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({email});
            resolve(user);
            // if (!user) resolve();
            //
            //
            // if (!user) throw new Error('no user found.');
            // resolve(user);
        } catch (e) {
            console.log('error occred in find by email.');
            console.log(e);
            reject(e);
        }
    });
};

UserSchema.statics.getPhoneNumberByEmail = async function (email) {
    const User = this;

    try {
        const user = await User.findOne({email});
        const phoneNumber = user.mobile.phoneNumber;
        return phoneNumber;
    } catch (e) {
        console.log('error occured in get phone number by email');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.getProtectorByEmail = async function (email) {
    const User = this;
    try {
        const user = await User.findOne({email});
        return user;
        // return user.protector;
        // const protector = user.protectors;
        // return protectors;
    } catch (e) {
        console.log('error occured in get phone number by email');
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
    try {
        const user = await User.findOne({email});
        if (!user) throw new Error("no user found.");
        await user.update({
            'mobile.token' : clientToken
            // $set : {
            //     mobile : {
            //         token : clientToken
            //     }
            // }
        });
    } catch (e) {
        console.log('error occured in find by email and update client token.');
        throw new Error(e);
    }
};

UserSchema.statics.saveS3ImageData = async function (email, designation, uuid, result) {
    const User = this;
    const timestamp = moment().valueOf(); // here, you check the time stamp and save it.
    const replaced = email.replace(/[@.]/g, '-');
    const key = `${replaced}/${designation}/${uuid}`;

    try {
        const user = await User.findOne({email});
        user.S3.push({
            key,
            timestamp,
            result
        });
        await user.save();
    } catch (e) {
        console.log('error occured in save s3 image data');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.saveProtectorData = async function (email, phoneNumber, name) {
    const User = this;
    try {
        const user = await User.findOne({email});
        user.protectors.push({
            phoneNumber,
            name
        });
        await user.save();
    } catch (e) {
        console.log('error occured in save protector data');
        console.log(e);
        throw new Error(e);
    }
};

UserSchema.statics.findByEmailAndUpdateUser = async function (email, docs) {
    console.log('enter find by email and update user');
    const User = this;

    try {
        const query = {email};
        const update = {$set: {...docs}};
        console.log('update : ');
        console.log(JSON.stringify(update, undefined, 2));
        await User.findOneAndUpdate(query, update).exec();
    } catch (e) {
        console.log('error occured in find by email and update user');
        console.log(e);
        throw new Error(e);
    }
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

UserSchema.statics.findByEmailAndUpdatePhoneNumber = async function (email, pn) {
    const User = this;
    try {
        console.log('phone number : ', pn);
        const user = await User.findOne({email});
        if (!user) throw new Error("no user found.");
        // console.log('user : ');
        // console.log(JSON.stringify(user, undefined, 2));
        await user.update({
            'mobile.phoneNumber' : pn
            // $set : {
            //     mobile : {
            //         phoneNumber : pn
            //     }
            // }
        });

        // user.mobile['phoneNumber'] = pn;
        // user.mobile.phoneNumber = pn;

        //
        // user.mobile = {
        //     token : user.mobile.token,
        //     phoneNumber : pn
        // };
        // user.set({
        //     mobile : {
        //         phoneNumber : pn
        //     }
        // });
        // user.mobile.phoneNumber = pn;
        // await user.save();
        // const query = {email};
        // const update = {
        //     mobile : {
        //         phoneNumber : pn
        //     }
        // };
        // await User.findOneAndUpdate(query, update).exec();

    } catch (e) {
        console.log('error occured in find by email and update phone number.');
        console.log(e);
        throw new Error(e);
    }
};

// UserSchema.statics.saveS3Image

module.exports = mongoose.model('user', UserSchema);
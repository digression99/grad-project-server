const mongoose = require('../config/mongoose');

const DeviceSchema = new mongoose.Schema({
    deviceId : {
        type : Number,
        required : true
    },
    awsEndpoint : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : false
    }
});

DeviceSchema.statics.findDeviceById = function (id) {
    console.log('enter find device by id');
    const Device = this;
    return new Promise(async (resolve, reject) => {
        try {
            const device = await Device.findOne({deviceId : id});
            if (!device) {
                throw new Error('no device found.');
            }
            resolve(device);
        } catch (e) {
            console.log('error occured in find device by id.');
            console.log(e);
            reject(e);
        }
    });
};

DeviceSchema.statics.createDevice = function (id, endpoint) {
    console.log('enter create device');
    const Device = this;
    return new Promise(async (resolve, reject) => {
        try {
            const device = new Device({
                deviceId : id,
                awsEndpoint : endpoint
            });
            await device.save();
            resolve();
        } catch (e) {
            console.log('error occured in create device.');
            console.log(e);
            reject(e);
        }
    });
};

DeviceSchema.statics.updateDevice = function (id, docs) {
    console.log('enter update device');
    const Device = this;
    return new Promise(async (resolve, reject) => {
        try {
            const query = {deviceId: id};
            const update = {$set: {...docs}};
            await Device.findOneAndUpdate(query, update).exec();
            resolve();
        } catch (e) {
            console.log('error occured in update device');
            console.log(e);
            reject(e);
        }
    });
};

module.exports = mongoose.model('device', DeviceSchema);
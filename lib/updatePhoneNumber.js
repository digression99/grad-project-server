const User = require('../models/User');

const updatePhoneNumber = (email, phoneNumber) => new Promise(async (resolve, reject) => {
    console.log('entered update phone number');

    try {
        console.log('phone number : ', phoneNumber);
        await User.findByEmailAndUpdatePhoneNumber(email, phoneNumber);
        resolve();
    } catch (e) {
        console.log('error occured in update phone number');
        reject(e);
    }
});

module.exports = updatePhoneNumber;
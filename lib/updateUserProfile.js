
const User = require('../models/User');

const updateUserProfile = (email, data) => new Promise(async (resolve, reject) => {
    console.log('enter update user profile');
    try {
        await User.findByEmailAndUpdateUser(email, data);
        resolve();
    } catch (e) {
        console.log('error occured in update user profile.');
        console.log(e);
        reject(e);
    }
});

module.exports = updateUserProfile;

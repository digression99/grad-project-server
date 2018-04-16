const User = require('../models/User');

const saveUserToDB = (email, password, token) => new Promise(async (resolve, reject) => {
    console.log('entered save user to db.');
    try {
        const user = new User({
            email,
            password,
            mobile : {
                token
            }
        });
        await user.save();
    } catch (e) {
        console.log('error occured in save user to db.');
        console.log(e);
        reject(e);
    }
});

module.exports = saveUserToDB;
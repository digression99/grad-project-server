const sendSMSToUser = require('./sendSMSToUser');
const User = require('../models/User');

const sendSMSToProtectors = (email, msg) => new Promise(async (resolve, reject) => {

    try {
        // const protector = User.getProtectorByEmail(email);
        // console.log('protector is : ');
        // console.log(protector);
        //
        // await sendSMSToUser("+821099177190", msg);
        // protectors.map(async protector => {
        //     await sendSMSToUser(protector.phoneNumber, msg);
        // });
        resolve();
    } catch (e) {
        console.log('error occured in send sms to protectors.');
        console.log(e);
        reject(e);
    }
});

module.exports = sendSMSToProtectors;
const twilio = require('twilio');

const sendSMSToUser = (phoneNumber, msg, countryCode) => new Promise(async(resolve, reject) => {

    console.log('enter send sms to user.');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const replaced = countryCode + phoneNumber.substring(1, phoneNumber.length);
    console.log('replaced : ', replaced);

    try {
        const client = new twilio(accountSid, authToken);
        const result = await client.messages.create({
            body: msg,
            to: replaced,  // Text this number
            from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
        });
        resolve(result);
    } catch (e) {
        console.log('error in send sms to user');
        console.log(e);
        reject(e);
    }
});

module.exports = sendSMSToUser;

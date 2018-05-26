
// const fcm = require('../../config/fcm');
const { admin } = require('../../config/firebase');
const User = require('../../models/User');
const pify = require('pify');

const deleteUserInFirebase = (email) => new Promise(async (resolve, reject) => {
    console.log('entered deleteUserInFirebase');
    console.log('email is : ', email);

    try {
        const res = await admin.auth().getUserByEmail(email);

        console.log('res is : ');
        console.log(JSON.stringify(res, undefined, 2));

        await admin.auth().deleteUser(res.uid);
        console.log('successfully deleted user.');
        resolve();
    } catch (e) {
        console.log('error occured in deleteUserInFirebase');
        console.log(e);
        reject(e);
    }
});

module.exports = deleteUserInFirebase;
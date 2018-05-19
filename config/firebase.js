const firebase = require('firebase');
const admin = require('firebase-admin');
// import * as firebase from 'firebase';

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,

    FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY
} = require('../lib/constants');

const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY
    }),
    databaseURL: FIREBASE_DATABASE_URL
});

firebase.initializeApp(config);

console.log('firebase connected');

module.exports = {firebase, admin};
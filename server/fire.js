// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// var firebase = require("firebase/app");
//
// // Add the Firebase products that you want to use
// require("firebase/database");
// require("firebase/auth");
//
// const config = require("./credentials.js");
//
var admin = require('firebase-admin');

const fire = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.SERVER_FIREBASE_PROJECT_ID,
        clientEmail: process.env.SERVER_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.SERVER_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.SERVER_FIREBASE_DATABASE_URL,
});

const db = fire.database();
const auth = fire.auth();

module.exports = {
    fire,
    db,
    auth,
};

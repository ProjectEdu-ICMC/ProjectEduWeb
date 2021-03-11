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

var serviceAccount = require('./private-key.json');

const fire = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://p-edu-test-default-rtdb.firebaseio.com',
});

const db = fire.database();
const auth = fire.auth();

module.exports = {
    fire,
    db,
    auth,
};

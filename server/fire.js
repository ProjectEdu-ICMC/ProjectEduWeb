// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/database");

const config = require("./credentials.js");
const fire = firebase.initializeApp(config);

module.exports = fire;

import firebase from 'firebase/app';

import 'firebase/auth';

const config = require("./credentials.js");
const fire = firebase.initializeApp(config);

const auth = fire.auth();

// TODO: move onAuthStateChange to here

export {
    fire,
    auth
};


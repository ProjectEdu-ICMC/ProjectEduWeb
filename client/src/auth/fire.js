// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
// import useLocalStorage from '../hooks/localStorageHook.js';

const config = require("./credentials.js");
const fire = firebase.initializeApp(config);

const auth = fire.auth();

// const [ , setToken ] = useLocalStorage('@token');
// 
// auth.onAuthStateChanged(async (user) => {
//     const token = await user?.getIdToken();
//     setToken(token);
//     console.log(token);
//     console.log(user);
//     console.log(auth.currentUser);
// });

export {
    fire,
    auth
};


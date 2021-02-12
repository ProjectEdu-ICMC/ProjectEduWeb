const express = require('express');
const cors = require('cors');
const bp = require('body-parser');

const app = express();

const auth = require('./middlewares/auth');

const moduleRouter = require('./routes/module');
const topicRouter = require('./routes/topic');
const slideRouter = require('./routes/slide');
// const auth = require('./routers/auth');

// const firebase = require('firebase/app');
// require('firebase/database');
// firebase.initializeApp(require('./credentials.js'));
// const db = firebase.database();
// const { db } = require('./fire.js');
// 
// function writeUserData(userId, name, email, imageUrl) {
//     db.ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture : imageUrl
//     });
// }
// 
// var userRef = db.ref('users');
// userRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   log = data;
// });

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/', auth);

app.use('/module', moduleRouter);
app.use('/topic', topicRouter);
app.use('/slide', slideRouter);

app.get('/test', (req, res) => {
    const { uid } = res.locals;
    console.log(uid);

    res.send({ uid });
});
// app.use('/auth', auth)

// let count = 1;
// let log = [];
// app.get('/', function(req, res) {
//     writeUserData(count, 'user_' + count, 'u' + count + '@gmail.com', '');
// 
//     res.send(log);
//     count++;
// });

// app.get('/register', (req, res) => {
//     auth.createUserWithEmailAndPassword('alexgalocha.jr@gmail.com', '123456')
//         .then((user) => {
//             auth.currentUser.getIdToken()
//                 .then((token) => {
//                     res.send({ token });
//                 });
//         })
//         .catch((error) => {
//             res.send({ error });
//         });
// });
// 
// app.get('/login', (req, res) => {
//     auth.signInWithEmailAndPassword('alexgalocha.jr@gmail.com', '123456')
//         .then((result) => {
//             auth.currentUser.getIdToken()
//                 .then((token) => {
//                     res.send({ token });
//                 });
// 
//         })
//         .catch((error) => {
//             res.send({ error });
//         });
// });

app.listen(3001);

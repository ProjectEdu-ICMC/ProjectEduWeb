const express = require('express');
const cors = require('cors');

const fire = require('./fire.js');
const db = fire.database();

const app = express();

function writeUserData(userId, name, email, imageUrl) {
    db.ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

var userRef = db.ref('users');
userRef.on('value', (snapshot) => {
  const data = snapshot.val();
  log = data;
});

app.use(cors())

let count = 1;
let log = [];
app.get('/', function(req, res) {
    writeUserData(count, 'user_' + count, 'u' + count + '@gmail.com', '');

    res.send(log);
    count++;
});

app.listen(3001);

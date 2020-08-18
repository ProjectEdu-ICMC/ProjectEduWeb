const express = require('express');
const cors = require('cors');

const fs = require('fs');

const app = express();

app.use(cors())
app.get('/', (req, res) => {
    fs.readFile('./data.json', (err, strData) => {
        if (err) return console.log(err);
        
        const data = JSON.parse(strData);
        return res.send(data);
    });
})

app.listen(3001);
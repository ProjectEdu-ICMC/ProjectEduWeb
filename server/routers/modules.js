const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/all', (req, res) => {
    fs.readFile('./data.json', (err, strData) => {
        if (err) return console.log(err);
        
        const data = JSON.parse(strData);

        let resArr = [];
        for (let item of data) {
            const {subModuleName: name, subModuleImage: image} = item;

            const module = {
                name, image
            };

            resArr.push(module);
        }
        
        return res.send(resArr);
    });
});

router.get('/', (req, res) => {
    const { id } = req.query;

    fs.readFile('./data.json', (err, strData) => {
        if (err) return console.log(err);
        
        const data = JSON.parse(strData);

        if (id >= data.length)
            return res.send(undefined)

        const {
            subModuleName: name, 
            subModuleImage: image, 
            subModuleTopics: _topics, 
            subModuleExercises: exercises
        } = data[id];
        
        const topics = [];
        for (item of _topics) {
            const { topicName } = item;
            topics.push({ name: topicName })
        }

        const module = {
            name, image, topics, exercises
        };
        
        return res.send(module);
        
    });
});

module.exports = router
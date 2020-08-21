const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./data.json', (err, strData) => {
        if (err) return console.log(err);
        
        const data = JSON.parse(strData);

        let resArr = []
        for (let item of data) {
            const {subModuleName: name, subModuleImage: image} = item

            const subMod = {
                name, image
            }

            resArr.push(subMod)
        }
        
        return res.send(resArr);
    });
})


module.exports = router
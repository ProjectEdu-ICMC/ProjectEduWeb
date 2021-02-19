const express = require('express');
const router = express.Router();

const { db } = require('../fire.js');

router.get('/:mod/:topic/:slide', (req, res) => {
    const { mod, topic } = req.params;
    const { uid } = res.locals;

    const infoRef = db.ref('info').orderByChild('slide').equalTo(slide);
    infoRef.once('value', (snap) => {
        const infos = snap.val();
        if (!infos) res.status(200).send([]);

        const array = Object.values(infos);
        const ids = Object.keys(infos);

        for (let i = 0; i < array?.length; i++) 
            array[i].id = ids[i];

        return res.status(200).send(array);
    });
    //const modRef = db.ref(`modules/${mod}`);
    //const topRef = db.ref(`topics/${topic}`);
    //modRef.once('value', (modCheck) => {
    //    const modVal = modCheck.val();

    //    if (modVal?.creator) {
    //        const { creator } = modVal;
    //        if (creator === uid) {
    //            topRef.once('value', (topCheck) => {
    //                const topVal = topCheck.val();
    //                if (topVal?.module === mod) {
    //                    slideRef.once('value', (snap) => {
    //                        const slides = snap.val();

    //                        if (!slides) return res.send([]);
    //                        
    //                        const array = Object.values(slides);
    //                        const ids = Object.keys(slides);

    //                        for (let i = 0; i < array?.length; i++) {
    //                            array[i].id = ids[i];
    //                        }

    //                        return res.send(array);
    //                    });
    //                }
    //            });
    //        }
    //    }
    //    
    //});

});

router.post('/', (req, res) => {
    const { body } = req;
    const { uid } = res.locals;
        
    const info = {
        creator: uid,
        ...body
    }

    const new_info = db.ref('infos').push(info, (error) => {
        if (error) {
            res.status(502).send(error);
        } else {
            res.status(200).send({ info_id: new_info.key });
        }
    });
});

router.put('/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { uid } = res.locals;

    const ref = db.ref(`infos/${id}`);
    ref.once('value', (snap) => {
        const { creator, module, topic, slide } = snap.val();

        if (creator !== uid)
            return res.status(403).send('');

        if (module !== body.module)
            return res.status(409).send('');

        if (topic !== body.topic)
            return res.status(409).send('');

        if (slide !== body.slide)
            return res.status(409).send('');

        ref.update(body, (error) => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.status(200).send({ info_id: id });
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { uid } = res.locals;

    const ref = db.ref(`infos/${id}`);
    ref.once('value', (snap) => {
        const val = snap.val();
        if (!val || val === null || val === undefined)
            return res.status(404).send('');

        const { creator } = val;

        if (creator !== uid)
            return res.status(403).send('');

        ref.remove(error => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.status(200).send({ info_id: id });
            }
        });
    });
});

module.exports = router;

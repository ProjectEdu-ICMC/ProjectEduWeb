const express = require('express');
const router = express.Router();

const { db } = require('../fire.js');

router.get('/:mod/:topic', (req, res) => {
    const { mod, topic } = req.params;
    const { uid } = res.locals;

    const slideRef = db.ref('slides').orderByChild('topic').equalTo(topic);
    const modRef = db.ref(`modules/${mod}`);
    const topRef = db.ref(`topics/${topic}`);
    modRef.once('value', (modCheck) => {
        const modVal = modCheck.val();

        if (modVal?.creator) {
            const { creator } = modVal;
            if (creator === uid) {
                topRef.once('value', (topCheck) => {
                    const topVal = topCheck.val();
                    if (topVal?.module === mod) {
                        slideRef.once('value', (snap) => {
                            const slides = snap.val();

                            if (!slides) return res.send([]);

                            const array = Object.values(slides);
                            const ids = Object.keys(slides);

                            for (let i = 0; i < array?.length; i++) {
                                array[i].id = ids[i];
                            }

                            return res.send(array);
                        });
                    }
                });
            }
        }
    });
});

router.post('/', (req, res) => {
    const { body } = req;
    const { uid } = res.locals;

    const mod = {
        creator: uid,
        ...body,
    };

    const new_slide = db.ref('slides').push(mod, (error) => {
        if (error) {
            res.status(502).send(error);
        } else {
            res.send({ slide_id: new_slide.key });
        }
    });
});

router.put('/:id', (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const { uid } = res.locals;
    const ref = db.ref(`slides/${id}`);
    ref.once('value', (snap) => {
        const { creator, module, topic } = snap.val();

        if (creator !== uid) return res.send('').status(403);

        if (module !== body.module) return res.send('').status(409);

        if (topic !== body.topic) return res.send('').status(409);

        ref.update(body, (error) => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.send({ slide_id: id });
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { uid } = res.locals;

    const ref = db.ref(`slides/${id}`);
    ref.once('value', (snap) => {
        const val = snap.val();
        if (!val || val === null || val === undefined)
            return res.status(404).send();

        const { creator } = val;

        if (creator !== uid) return res.send('').status(403);

        ref.remove((error) => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.send({ slide_id: id });
            }
        });
    });
});

module.exports = router;

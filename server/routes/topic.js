const express = require('express');
const router = express.Router();

const { db } = require('../fire.js');

router.get('/:mod', (req, res) => {
    const { mod } = req.params;
    const { uid } = res.locals;
    
    const topRef = db.ref('topics').orderByChild('module').equalTo(mod);
    const modRef = db.ref(`modules/${mod}`);
    modRef.once('value', (check) => {
        const _check = check.val();

        if (_check?.creator) {
            const { creator } = _check;
            if (creator === uid) {
                topRef.once('value', (snap) => {
                    const topics = snap.val();
                    
                    if (!topics) return res.send([]);

                    const array = Object.values(topics);
                    const ids = Object.keys(topics);

                    for (let i = 0; i < array?.length; i++) {
                        array[i].id = ids[i];
                    }

                    return res.send(array);
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
        ...body
    }

    const new_topic = db.ref('topics').push(mod, (error) => {
        if (error) {
            res.status(502).send(error);
        } else {
            res.send({ topic_id: new_topic.key });
        }
    });
});

router.put('/:id', (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const { uid } = res.locals;
    const ref = db.ref(`topics/${id}`);
    ref.once('value', (snap) => {
        const { creator, module } = snap.val();

        if (creator !== uid)
            return res.send('').status(403);

        if (module !== body.module)
            return res.send('').status(409);

        ref.update(body, (error) => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.send({ topic_id: id });
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { uid } = res.locals;

    const ref = db.ref(`topics/${id}`);
    ref.once('value', (snap) => {
        const val = snap.val();
        if (!val || val === null || val === undefined)
            return res.status(404).send();

        const { creator } = val;

        if (creator !== uid)
            return res.send('').status(403);

        ref.remove(error => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.send({ topic_id: id });
            }
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { db } = require('../fire.js');

router.get('/', (req, res) => {
    const { uid } = res.locals;

    const ref = db.ref('modules').orderByChild('creator').equalTo(uid);
    ref.once('value', (snap) => {
        const modules = snap.val();
    
        if (!modules) return res.send([]);

        const array = Object.values(modules);
        const ids = Object.keys(modules);

        for (let i = 0; i < array?.length; i++) {
            array[i].id = ids[i];
        }

        return res.send(array);
    });
});

router.post('/', (req, res) => {
    const { body } = req;
    const { uid } = res.locals;
    
    const mod = {
        creator: uid,
        ...body
    }

    const new_module = db.ref('modules').push(mod, (error) => {
        if (error) {
            res.status(502).send(error);
        } else {
            res.send({ module_id: new_module.key });
        }
    });
});

router.put('/:id', (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const { uid } = res.locals;
    
    const ref = db.ref(`modules/${id}`);
    ref.once('value', (snap) => {
        const { creator } = snap.val();

        if (creator !== uid)
            return res.send('').status(403);

        ref.update(body, (error) => {
            if (error) {
                res.status(502).send(error);
            } else {
                res.send({ module_id: id });
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { uid } = res.locals;

    const ref = db.ref(`modules/${id}`);
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
                res.send({ module_id: id });
            }
        });
    });
});

module.exports = router;

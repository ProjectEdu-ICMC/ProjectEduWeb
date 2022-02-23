const express = require('express');
const cors = require('cors');
const bp = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

const auth = require('./middlewares/auth');

const moduleRouter = require('./routes/module');
const topicRouter = require('./routes/topic');
const slideRouter = require('./routes/slide');
const infoRouter = require('./routes/info');
const explanationRouter = require('./routes/explanation');
const explorationRouter = require('./routes/exploration');

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/', auth);

app.use('/module', moduleRouter);
app.use('/topic', topicRouter);
app.use('/slide', slideRouter);
app.use('/info', infoRouter);
app.use('/explanation', explanationRouter);
app.use('/exploration', explorationRouter);

app.listen(3001);

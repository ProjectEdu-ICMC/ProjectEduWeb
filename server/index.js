const express = require('express');
const cors = require('cors');

// routers
const modules = require('./routers/modules')

const app = express();

app.use(cors())
app.use('/module', modules)

app.listen(3001);

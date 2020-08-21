const express = require('express');
const cors = require('cors');

// routers
const subModules = require('./routers/subModules')

const app = express();

app.use(cors())
app.use('/submodules', subModules)

app.listen(3001);
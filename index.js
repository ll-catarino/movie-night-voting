const express = require('express');
const app = express();
app.use(express.json()); // json parser middleware

//const cors = require('cors')
//app.use(cors)

const PORT = 3000;
app.listen(PORT, () => {console.log('api running on port ' + PORT)})

const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

const logger = require('./middlewares/logger.js');
app.use(logger)

const title = require('./routes/title');
const search = require('./routes/search');
const list = require('./routes/list');


app.use('/title', title);
app.use('/search', search);
app.use('/list', list);


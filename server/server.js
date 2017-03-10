// server.js

// set up ========================
require('dotenv').config();

const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

// Initialization 

// Configuration =================;

app.use(express.static(`${__dirname}/public`));  // set the static files location /public/img will be /img for users
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({ extended: 'true' }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes ======================================================================

require('./routes/index')(app);
// api ---------------------------------------------------------------------

// listen port 5000 on localhost(start app with node server.js) =======
app.listen(process.env.PORT || 5000);
console.log(`Server on port ${process.env.PORT || 5000}`)
module.exports = app;

// server.js

// set up ========================
const express = require('express');

const app = express(); // create our app w/ express

const morgan = require('morgan'); // log requests to the console (express4)

const bodyParser = require('body-parser'); // pull information from HTML POST (express4)

//const indexFile = require('./src/inverted-index.js');

let content;

// Initialization
//const index = new indexFile.Index();

// configuration =================;

app.use(express.static(`${__dirname}/public`));  // set the static files location /public/img will be /img for users
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({ extended: 'true' }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// routes ======================================================================

// api ---------------------------------------------------------------------

// return created index

app.get('/users', (req, res) => {
  res.json();
});


app.post('/users', (req, res) => {
	res.status(400).send({
		message: 'e.message',
	});
});

// listen port 5000 on localhost(start app with node server.js) =======
app.listen(process.env.PORT || 5000);
module.exports = app

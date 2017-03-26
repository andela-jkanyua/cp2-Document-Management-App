

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';
/* eslint-disable no-console */
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

require('./routes/index')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
module.exports = app;

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const checkAPI_KEY = async (req,res,next) => {
  if (req.query.apiKey !== process.env.API_KEY) {
    res.json({
      status : 403,
    });
  } else {
    next();
  }
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.all('/api/*',checkAPI_KEY);
app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

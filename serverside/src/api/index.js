const express = require('express');

const emojis = require('./emojis');
const api = require('./api');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/blog',api);

module.exports = router;

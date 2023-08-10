const router = require('express').Router();
const data = require('./data');

router.use('/data', data);

module.exports = router;

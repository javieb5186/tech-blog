const router = require('express').Router();

const apiRoutes = require('./api');
const rootRoutes = require('./rootRoutes');

router.use('/api', apiRoutes);
router.use('/', rootRoutes);

module.exports = router;

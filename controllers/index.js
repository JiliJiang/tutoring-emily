const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoute = require('./home-route');

router.use('/', homeRoute);
router.use('/api', apiRoutes);

module.exports = router;
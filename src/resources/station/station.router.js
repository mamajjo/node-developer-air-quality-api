const Router = require('express').Router;
const controllers = require('./station.controller');

const router = Router();

// /station/findAll
router.route('/findAll').get(controllers.findAll);

module.exports = router;

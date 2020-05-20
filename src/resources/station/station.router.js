const Router = require('express').Router;
const controllers = require('./station.controller');

const router = Router();

// /station/findAll
router.route('/findAll').get(controllers.findAll);

// /station/deleteAll
router.route('/delete/:id').delete(controllers.removeOne);

module.exports = router;

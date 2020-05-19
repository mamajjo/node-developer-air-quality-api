const Router = require('express').Router;
const controllers = require('./sensor.controller');

const router = Router();

// /sensors/:id
router.route('/:id').get(controllers.getSensorsCurrentData);

module.exports = router;

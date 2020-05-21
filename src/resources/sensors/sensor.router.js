const Router = require('express').Router;
const controllers = require('./sensor.controller');

const router = Router();

// /sensors/:id
router.route('/:id').get(controllers.getDataForStation);

// /sensors/:id/date/:date(19-05-2020)
router.route('/:id/date/:date').get(controllers.getDataForStationForDay);

// sensors/:id/from/:fromDate/to/:toDate
router
    .route('/:id/from/:fromDate/to/:toDate')
    .get(controllers.getDataForStationBetweenDates);

module.exports = router;

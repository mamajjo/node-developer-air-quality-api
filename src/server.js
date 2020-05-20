const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const stationRouter = require('./resources/station/station.router');
const sensorRouter = require('./resources/sensors/sensor.router');
const connect = require('./utils/db').connect;
const config = require('./config/index');
const dbSetUp = require('./services/stationUpdater').updateStations;
const createDailyReportForStation = require('./services/sensorUpdater')
    .createDailyReportForStation;

const app = express();

var corsOptions = {
    orgin: 'http://localhost:1234'
};

app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send({
        message: 'hello'
    });
});

app.use('/station', stationRouter);
app.use('/sensors', sensorRouter);

async function connectDB() {
    await connect();
}

module.exports.start = () => {
    try {
        connectDB();
        app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`);
        });
        dbSetUp();
    } catch (e) {
        console.log('could not start up');
    }
};

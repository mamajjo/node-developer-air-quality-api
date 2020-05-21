const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const stationRouter = require('./resources/station/station.router');
const sensorRouter = require('./resources/sensors/sensor.router');
const connect = require('./utils/db').connect;
const config = require('./config/index');
const updateDB = require('./services/stationUpdater').updateStations;

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
        cron.schedule('38 15 * * *', function () {
            console.log('Update stations at 10:10PM');
            updateDB();
        });
    } catch (e) {
        console.log('could not start up');
    }
};

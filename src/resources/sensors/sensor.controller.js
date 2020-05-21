const fetch = require('node-fetch');
const Sensor = require('./sensor.model');

const betweenDatesPredicate = (fromDate, toDate, date) => {
    var d1 = fromDate.split('-');
    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11

    var d2 = toDate.split('-');
    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);

    var c = date.split('-');
    var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

    if (check >= from && check <= to) return true;
    else return false;
};

const checkFromAfterTo = (fromDate, toDate) => {
    var d1 = fromDate.split('-');
    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11

    var d2 = toDate.split('-');
    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);

    if (from > to) return false;
    return true;
};

exports.getDataForStation = async (req, res) => {
    let sensors = [];
    await fetch(
        `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${req.params.id}`
    )
        .then((res) => res.json())
        .then((data) => (sensors = data));
    const sensorsResponse = [];
    let counter = sensors.length;
    sensors.forEach((sensor) => {
        fetch(`http://api.gios.gov.pl/pjp-api/rest/data/getData/${sensor.id}`)
            .then((res) => res.json())
            .then((data) => {
                const stationData = {
                    stationID: req.params.id,
                    sensorID: sensor.id,
                    sensorData: {
                        name: data.key,
                        data: data.values.find((v) => v.value != null)
                    }
                };
                counter--;
                sensorsResponse.push(stationData);
                if (counter === 0)
                    res.status(200).json({ data: sensorsResponse });
            })
            .catch((e) => {
                res.status(400).end();
            });
    });
};

exports.getDataForStationForDay = async (req, res) => {
    try {
        const sensorDataForDay = await Sensor.find({
            stationID: req.params.id,
            date: req.params.date
        });
        if (!sensorDataForDay) return res.status(400).end();
        if (sensorDataForDay.length === 0)
            return res.status(204).json({ data: 'no data for given date' });
        return res.status(200).json({ data: sensorDataForDay });
    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
};

exports.getDataForStationBetweenDates = async (req, res) => {
    if (!checkFromAfterTo(req.params.fromDate, req.params.toDate))
        return res.status(400).json({
            date: 'invalid dates: from(yyyy-mm-dd) > to(yyyy-mm-dd)'
        });
    try {
        const allSensorDataForStation = await Sensor.find({
            stationID: req.params.id
        });
        console.log('inner');
        const sensorDataBetweenDates = allSensorDataForStation.filter((data) =>
            betweenDatesPredicate(
                req.params.fromDate,
                req.params.toDate,
                data.date
            )
        );
        if (!allSensorDataForStation) return res.status(400).end();
        if (sensorDataBetweenDates.length === 0)
            return res
                .status(202)
                .json({ data: 'no data for given date range' });
        return res.status(200).json({ data: sensorDataBetweenDates });
    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
};

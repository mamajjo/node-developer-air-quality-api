const fetch = require('node-fetch');
const Sensor = require('../resources/sensors/sensor.model');

const extractDate = (date) => {
    return date
        .slice(0, 10)
        .split('-')
        .map((str) => {
            return Number(str);
        });
};

const todaysDatePredicate = (sensorDataValues) => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yyyy = today.getFullYear();
    const [extractedYYYY, extractedMM, extractedDD] = extractDate(
        sensorDataValues.date
    );
    if (dd === extractedDD && mm === extractedMM - 1 && yyyy === extractedYYYY)
        return true;
    else return false;
};

const average = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++)
        if (arr[i].value != null) sum += arr[i].value;

    return sum / arr.length;
};

const agregateDaySensorDate = (stationID, sensorID, sensorKey, todaysData) => {
    let today;
    try {
        today = todaysData[0].date.slice(0, 10);
    } catch (e) {
        console.log(
            `No todays data for sensor ${sensorID} with key ${sensorKey}`
        );
        return null;
    }
    const avgValue = average(todaysData).toFixed(4);
    const measurementID = `${stationID}-${sensorKey}-${today}`;
    return {
        measurementID: measurementID,
        stationID: stationID,
        sensorID: sensorID,
        sensorData: {
            name: sensorKey,
            data: avgValue
        },
        date: today
    };
};

const createDailyReportForStation = async (stationID) => {
    let sensors = [];
    await fetch(
        `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationID}`
    )
        .then((res) => res.json())
        .then((data) => (sensors = data))
        .catch((e) => {
            console.log(e);
        });
    sensors.forEach((sensor) => {
        fetch(`http://api.gios.gov.pl/pjp-api/rest/data/getData/${sensor.id}`)
            .then((res) => res.json())
            .then((data) => {
                const todaySensorData = data.values.filter((sensorValues) =>
                    todaysDatePredicate(sensorValues)
                );
                Sensor.create(
                    agregateDaySensorDate(
                        stationID,
                        sensor.id,
                        data.key,
                        todaySensorData
                    ),
                    (err) => {
                        if (
                            err != null &&
                            err.code != null &&
                            err.code === 11000
                        )
                            console.log(
                                'found duplicate on adding todays measurement: ' +
                                    stationID
                            );
                    }
                );
            })
            .catch((e) => console.log(e));
    });
};

module.exports = {
    createDailyReportForStation: createDailyReportForStation
};

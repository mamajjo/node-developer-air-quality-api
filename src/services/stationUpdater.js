const fetch = require('node-fetch');
const updateSensor = require('./sensorUpdater').createDailyReportForStation;
const findAll = require('../resources/station/station.controller').findAll;
const Station = require('../resources/station/station.model');

const updateStations = async () => {
    let foundStations = [];
    await fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll')
        .then((response) => response.json())
        .then((data) => (foundStations = data));
    let localDBStationsIDs = [];
    await Station.find()
        .lean()
        .exec()
        .then(
            (data) =>
                (localDBStationsIDs = data.map((d) => {
                    return d.stationID;
                }))
        );
    let remoteStationsIDs = [];
    foundStations.forEach((station) => {
        remoteStationsIDs = [...remoteStationsIDs, station.id];
    });
    let counter = foundStations.length;
    foundStations.forEach((station) => {
        Station.create(
            {
                stationID: station.id,
                stationName: station.stationName,
                geo: {
                    lat: station.gegrLat,
                    lng: station.gegrLon
                },
                city: station.city.name,
                address: station.addressStreet
            },
            (err) => {
                counter--;
                if (err != null && err.code != null && err.code === 11000) {
                    const idx = remoteStationsIDs.indexOf(station.id);
                    if (idx > -1) remoteStationsIDs.splice(idx, 1);
                    console.log(
                        'found duplicate on station: ' + station.stationName
                    );
                }
                if (counter === 0 && remoteStationsIDs.length !== 0)
                    console.log(
                        'Collection changed ' +
                            remoteStationsIDs.length +
                            ' couter: ' +
                            counter
                    );
                if (counter === 0) {
                    if (localDBStationsIDs.length === 0)
                        throw new Error('local DB is empty!');

                    localDBStationsIDs.forEach((id) => {
                        updateSensor(id);
                    });
                }
            }
        );
    });
};

exports.updateStations = updateStations;

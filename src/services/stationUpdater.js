const fetch = require('node-fetch');
const Station = require('../resources/station/station.model');

const updateStations = async () => {
    let foundStations = [];
    await fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll')
        .then((response) => response.json())
        .then((data) => (foundStations = data));
    let localStationsIDs = [];
    foundStations.forEach((station) => {
        localStationsIDs = [...localStationsIDs, station.id];
    });
    let counter = foundStations.length;
    console.log(localStationsIDs.length + ' couter: ' + counter);
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
                    const idx = localStationsIDs.indexOf(station.id);
                    if (idx > -1) localStationsIDs.splice(idx, 1);
                    console.log(
                        'found duplicate on station: ' + station.stationName
                    );
                }
                if (counter === 0 && localStationsIDs.length !== 0)
                    console.log(
                        'Collection changed ' +
                            localStationsIDs.length +
                            ' couter: ' +
                            counter
                    );
            }
        );
    });
};

exports.updateStations = updateStations;

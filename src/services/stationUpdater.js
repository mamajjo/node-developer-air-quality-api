const fetch = require('node-fetch');
const Station = require('../resources/station/station.model');

const updateStations = async () => {
    let foundStations = [];
    await fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll')
        .then((response) => response.json())
        .then((data) => (foundStations = data));
    foundStations.forEach((station) => {
        Station.create(
            {
                stationID: station.id,
                stationName: station.stationName
            },
            (err, res) => {
                if (err.code === 11000)
                    console.log(
                        'found duplicate on station: ' + station.stationName
                    );
            }
        );
    });
};

exports.updateStations = updateStations;

const fetch = require('node-fetch');
exports.getSensorsCurrentData = async (req, res) => {
    console.log(req.params);
    let sensors = [];
    await fetch(
        `http://api.gios.gov.pl/pjp-api/rest/station/sensors/${req.params.id}`
    )
        .then((res) => res.json())
        .then((data) => (sensors = data));
    sensors.forEach((sensor) => {
        fetch(`http://api.gios.gov.pl/pjp-api/rest/data/getData/${sensor.id}`)
            .then((res) => res.json())
            .then((data) =>
                console.log(
                    data.key +
                        JSON.stringify(
                            data.values.find((value) => value.value != null)
                        )
                )
            );
    });
    res.status(200).end();
};

const Station = require('./station.model');

exports.findAll = async (req, res) => {
    try {
        const stations = await Station.find().lean().exec();
        res.status(200).json({
            data: stations
        });
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
};

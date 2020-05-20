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

exports.removeOne = async (req, res) => {
    try {
        const removedStation = await Station.findOneAndRemove({
            stationID: req.params.id
        });
        if (!removedStation)
            return res.status(400).json({ data: 'did not find' });
        return res.status(200).json({ data: removedStation });
    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
};

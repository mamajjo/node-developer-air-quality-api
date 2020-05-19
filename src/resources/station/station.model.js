const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    stationID: {
        type: Number,
        required: true,
        unique: true
    },
    stationName: {
        type: String,
        required: true
    }
});

stationSchema.statics.findOneOrCreate = (condition, doc) => {
    const self = this;
    console.log(self);
    const newStation = doc;
    return new Promise((resolve, reject) => {
        return self
            .findOne(condition)
            .then((result) => {
                if (result) return resolve(result);
                return self
                    .create(newStation)
                    .then((result) => {
                        return resolve(result);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            })
            .catch((error) => {
                return reject(error);
            });
    });
};

module.exports = mongoose.model('Station', stationSchema);

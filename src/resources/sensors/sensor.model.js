const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    stationID: {
        type: Number,
        required: true
    },
    sensorID: {
        type: Number,
        required: true
    },
    sensorData: {
        name: {
            type: String,
            required: true
        },
        data: {
            type: Number,
            required: true,
            min: 0.0
        },
        date: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Sensor', sensorSchema);

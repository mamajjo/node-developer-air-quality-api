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

module.exports = mongoose.model('Station', stationSchema);

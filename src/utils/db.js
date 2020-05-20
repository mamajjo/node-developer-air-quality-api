const mongoose = require('mongoose');
const config = require('../config/index');

module.exports.connect = (url = config, opts = {}) => {
    return mongoose.connect(url.dbUrl, {
        ...opts,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
};

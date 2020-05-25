const lodash = require('lodash');
const merge = lodash.merge;
const env = process.env.NODE_ENV || 'cloud';

const basicConfig = {
    env,
    port: 3000
};

let envConfig = {};

switch (env) {
    case 'development':
        envConfig = require('./dev').config;
        break;
    case 'testing':
        envConfig = require('./testEnv').config;
        break;
    case 'cloud':
        envConfig = require('./cloudMongoEnv').config;
        break;
    default:
        envConfig = require('./dev').config;
}

module.exports = merge(basicConfig, envConfig);

const lodash = require('lodash');
const merge = lodash.merge;
const env = process.env.NODE_ENV || 'development';

const basicConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    port: 1234
};

let envConfig = {};

switch (env) {
    case 'development':
        envConfig = require('./dev').config;
        break;
    default:
        envConfig = require('./dev').config;
}

module.exports = merge(basicConfig, envConfig);

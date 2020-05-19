const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require('./utils/db').connect;
const config = require('./config/index');
const cors = require('cors');

const app = express();

var corsOptions = {
    orgin: 'http://localhost:1234'
};

app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send({
        message: 'hello'
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send({
        message: 'ok'
    });
});

async function connectDB() {
    await connect();
}

module.exports.start = () => {
    try {
        connectDB();
        app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`);
        });
    } catch (e) {
        console.log('could not start up');
    }
};

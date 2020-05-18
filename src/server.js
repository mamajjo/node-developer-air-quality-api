const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    orgin: 'http://localhost:1234'
};

app.use(cors(corsOptions));

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

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

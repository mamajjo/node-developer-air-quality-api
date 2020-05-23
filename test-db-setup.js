const mongoose = require('mongoose');
const _ = require('lodash');

const url = 'mongodb://localhost:27017/goodylabs_interview_test';

const remove = (collection) =>
    new Promise((resolve, reject) => {
        collection.remove((err) => {
            if (err) return reject(err);
            resolve();
        });
    });

beforeEach(async (done) => {
    function clearDB() {
        return Promise.all(
            _.map(mongoose.connection.collections, (c) => remove(c))
        );
    }

    if (mongoose.connection.readyState === 0)
        try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            await clearDB();
        } catch (e) {
            console.log('connection error');
            console.error(e);
            throw e;
        }
    else await clearDB();

    done();
});
afterEach(async (done) => {
    await mongoose.connection.db.dropDatabase();
    console.log('dropping data base');
    await mongoose.disconnect();
    return done();
});
afterAll((done) => {
    return done();
});

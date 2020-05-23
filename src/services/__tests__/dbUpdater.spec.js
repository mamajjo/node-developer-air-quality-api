const updateDB = require('../stationUpdater').updateStations;
const findAll = require('../../resources/station/station.controller').findAll;

async function setUpDb() {
    await updateDB();
}

describe('DB setup', () => {
    try {
        setUpDb();
        console.log('db set up');
    } catch (e) {
        console.log('failed to set up db');
    }
    test('updates station', async () => {
        expect.assertions(1);
        const req = {};
        const res = {
            status(status) {
                console.log(status);
                expect(status).toBe(200);
                return this;
            },
            json(data) {
                console.log(data);
            }
        };
        await findAll(req, res);
    });
});

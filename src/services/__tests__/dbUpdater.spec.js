const updateDB = require('../stationUpdater').updateStations;
const findAll = require('../../resources/station/station.controller').findAll;

async function setUpDb() {
    await updateDB();
}

describe('DB setup', () => {
    try {
        setUpDb();
    } catch (e) {}
    test('updates station', async () => {
        expect.assertions(1);
        const req = {};
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(data) {}
        };
        await findAll(req, res);
    });
});

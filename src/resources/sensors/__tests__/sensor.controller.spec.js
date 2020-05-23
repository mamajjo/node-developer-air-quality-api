const Sensor = require('../sensor.model');
const controller = require('../sensor.controller');

describe('Operations on Sensor Model', () => {
    const mockSensor = {
        measurementID: '123-CO-2020-05-20',
        stationID: 123,
        sensorID: 999,
        date: '2020-05-20',
        sensorData: {
            name: 'CO',
            data: 10
        }
    };
    const mockSensorAnotherDay = {
        measurementID: '123-CO-2020-05-19',
        stationID: 123,
        sensorID: 999,
        date: '2020-05-19',
        sensorData: {
            name: 'CO',
            data: 35
        }
    };
    const mockSensorAveraged = [
        {
            stationID: 123,
            sensorID: 999,
            sensorData: {
                name: 'CO',
                averagedData: 22.5
            }
        }
    ];
    const mockSensorFromOneDay = {
        stationID: 123,
        sensorID: 999,
        date: '2020-05-19',
        measurementID: '123-CO-2020-05-19',
        sensorData: {
            name: 'CO',
            data: 35
        }
    };

    const mocks = [];
    mocks.push(mockSensor);
    mocks.push(mockSensorAnotherDay);

    test('Create new Sensor', async () => {
        await Sensor.create(mockSensor);
        const foundSensor = await Sensor.findOne({
            measurementID: '123-CO-2020-05-20'
        })
            .lean()
            .exec();
        const rawFoundSensor = {
            measurementID: foundSensor.measurementID,
            stationID: foundSensor.stationID,
            sensorID: foundSensor.sensorID,
            date: foundSensor.date,
            sensorData: foundSensor.sensorData
        };
        expect(rawFoundSensor).toEqual(mockSensor);
    });

    test('Get sensor data for dates range', async () => {
        expect.assertions(2);
        await Sensor.insertMany(mocks);
        const req = {
            params: {
                id: 123,
                fromDate: '2020-05-19',
                toDate: '2020-05-20'
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(data) {
                expect(data.data).toEqual(mockSensorAveraged);
            },
            send(result) {}
        };
        await controller.getDataForStationBetweenDates(req, res);
    });

    test('Get sensor data for one day', async () => {
        expect.assertions(2);
        await Sensor.insertMany(mocks);
        const req = {
            params: {
                id: 123,
                date: '2020-05-19'
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(data) {
                const rawFoundSensor = {
                    measurementID: data.data[0].measurementID,
                    stationID: data.data[0].stationID,
                    sensorID: data.data[0].sensorID,
                    date: data.data[0].date,
                    sensorData: data.data[0].sensorData
                };
                expect(rawFoundSensor).toEqual(mockSensorFromOneDay);
            },
            send(result) {}
        };
        await controller.getDataForStationForDate(req, res);
    });
    test('Get sensor error code', async () => {
        expect.assertions(2);
        await Sensor.insertMany(mocks);
        const req = {
            params: {
                id: 123,
                fromDate: '2020-05-21',
                toDate: '2020-05-20'
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(400);
                return this;
            },
            json(data) {
                expect(data.data).toEqual(
                    'invalid dates: from(yyyy-mm-dd) > to(yyyy-mm-dd)'
                );
            },
            send(result) {}
        };
        await controller.getDataForStationBetweenDates(req, res);
    });
    test('No sensor data for given range', async () => {
        expect.assertions(2);
        await Sensor.insertMany(mocks);
        const req = {
            params: {
                id: 123,
                fromDate: '2020-05-15',
                toDate: '2020-05-16'
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(202);
                return this;
            },
            json(data) {
                expect(data.data).toEqual('no data for given date range');
            },
            send(result) {}
        };
        await controller.getDataForStationBetweenDates(req, res);
    });
});

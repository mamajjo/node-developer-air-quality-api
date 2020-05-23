const Sensor = require('../sensor.model');

describe('Sensor model test', () => {
    test('measurementID', () => {
        const measurementID = Sensor.schema.obj.measurementID;
        expect(measurementID).toEqual({
            type: String,
            required: true,
            unique: true
        });
    });
    test('stationID', () => {
        const stationID = Sensor.schema.obj.stationID;
        expect(stationID).toEqual({
            type: Number,
            required: true
        });
    });
    test('sensorID', () => {
        const sensorID = Sensor.schema.obj.sensorID;
        expect(sensorID).toEqual({
            type: Number,
            required: true
        });
    });
    test('date', () => {
        const date = Sensor.schema.obj.date;
        expect(date).toEqual({
            type: String,
            required: true
        });
    });
    test('sensorData', () => {
        const sensorData = Sensor.schema.obj.sensorData;
        expect(sensorData).toEqual({
            name: {
                type: String,
                required: true
            },
            data: {
                type: Number,
                required: true,
                min: 0.0
            }
        });
    });
});

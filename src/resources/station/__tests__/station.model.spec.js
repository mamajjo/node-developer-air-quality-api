const Station = require('../station.model');

describe('Station model tests', () => {
    test('stationID', () => {
        const stationID = Station.schema.obj.stationID;
        expect(stationID).toEqual({
            type: Number,
            required: true,
            unique: true
        });
    });
    test('stationName', () => {
        const stationName = Station.schema.obj.stationName;
        expect(stationName).toEqual({
            type: String,
            required: true
        });
    });
    test('city', () => {
        const city = Station.schema.obj.city;
        expect(city).toEqual({
            type: String,
            required: true
        });
    });
    test('address', () => {
        const address = Station.schema.obj.address;
        expect(address).toEqual({
            type: String,
            required: true
        });
    });
    test('geo', () => {
        const geo = Station.schema.obj.geo;
        expect(geo).toEqual({
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        });
    });
});

describe('Operations on Station Model', () => {
    test('Create new station', async () => {
        const mockStation = {
            stationID: 123,
            stationName: 'Test Station',
            city: 'Lodz',
            address: 'lodzkie 7',
            geo: {
                lat: 52.3,
                lng: 21.2
            }
        };
        await Station.create(mockStation);
        const foundStation = await Station.findOne({ stationID: 123 })
            .lean()
            .exec();
        const rawFoundStation = {
            stationID: foundStation.stationID,
            stationName: foundStation.stationName,
            city: foundStation.city,
            address: foundStation.address,
            geo: foundStation.geo
        };
        expect(rawFoundStation).toEqual(mockStation);
    });
});

const router = require('../sensor.router');

describe('sensor router', () => {
    test('routes successfully', () => {
        const routes = [
            { path: '/:id', method: 'get' },
            { path: '/:id/date/:date', method: 'get' },
            { path: '/:id/from/:fromDate/to/:toDate', method: 'get' }
        ];

        routes.forEach((route) => {
            const match = router.stack.find(
                (s) =>
                    s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});

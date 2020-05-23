const router = require('../station.router');

describe('station router', () => {
    test('routes successfully', () => {
        const routes = [
            { path: '/findAll', method: 'get' },
            { path: '/delete/:id', method: 'delete' }
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

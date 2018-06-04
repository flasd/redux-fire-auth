import assert from './index';

describe('assert', () => {
    describe('', () => {
        test('in non-production env', () => {
            expect(assert).toBeTruthy();
            expect(() => assert(false, 'xyz')).toThrow(/xyz/);
            expect(() => assert(true, 'message')).not.toThrow();

            function getErrorObject() {
                try {
                    assert(false, 'message');
                } catch (error) {
                    return error;
                }
            }
        })
    });

    describe('', () => {
        beforeAll(() => { process.env.NODE_ENV = 'production' });

        test('in production env', () => {
            expect(() => assert(false, 'message')).toThrow(/environment/);
        })

        afterAll(() => process.env.NODE_ENV = 'test')
    });
});

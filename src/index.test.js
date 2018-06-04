import createAuthMiddleware, { AUTH_STATE_CHANGED, DONE_LOADING } from './index';

function getTag(value) {
    return Object.prototype.toString.call(value);
}

describe('middleware', () => {
    test('createAuthMiddleware function', () => {
        const callbacks = [];
        const mockAuthInstance = {
            onAuthStateChanged: jest.fn(cb => callbacks.push(cb)),
        };

        const mockStore = {
            dispatch: jest.fn(),
            getState: jest.fn(() => ({ auth: { isLoading: false } })),
        }

        expect(getTag(createAuthMiddleware)).toBe('[object Function]');

        expect(() => createAuthMiddleware(null)).toThrow(/firebase/);
        expect(() => createAuthMiddleware(mockAuthInstance, 2)).toThrow(/reducerKey/);

        const middleware = createAuthMiddleware(mockAuthInstance);
        expect(getTag(middleware)).toBe('[object Function]');

        const middleman = middleware(mockStore);
        expect(getTag(middleman)).toBe('[object Function]');
        expect(mockAuthInstance.onAuthStateChanged).toHaveBeenCalledTimes(1);
        expect(callbacks).toHaveLength(1);

        callbacks[0](null);
        expect(mockStore.getState).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

        mockStore.getState = jest.fn(() => ({ auth: { isLoading: true } }));
        callbacks[0]({ toJSON: () => ({ dimension: 137 }) });
        expect(mockStore.getState).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

        const outerDispatcher = middleman(mockStore.dispatch);
        const innerDispatcher = outerDispatcher({ type: 'sup' });
        expect(mockStore.dispatch).lastCalledWith({ type: 'sup' });
    });

    test('exported constants', () => {
        expect(getTag(AUTH_STATE_CHANGED)).toBe('[object String]');
        expect(getTag(DONE_LOADING)).toBe('[object String]');
    });
});
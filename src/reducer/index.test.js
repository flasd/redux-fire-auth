import authReducer, { initialState } from './index';
import { AUTH_STATE_CHANGED, DONE_LOADING } from '../actions';

function getTag(value) {
    return Object.prototype.toString.call(value);
}

function createMockAction(type, payload = {}) {
    return Object.assign({}, { type }, payload);
}

describe('reducer', () => {
    test('initialState constant', () => {
        expect(getTag(initialState)).toBe('[object Object]');

        expect(initialState).toHaveProperty('isLoading', true);
        expect(initialState).toHaveProperty('hasAuth', false);
        expect(initialState).toHaveProperty('user', null);
    });

    describe('authReducer function', () => {
        expect(getTag(authReducer)).toBe('[object Function]');

        test('initial state', () => {
            const initialMockAction = createMockAction('@@redux/init');
            expect(authReducer(undefined, initialMockAction)).toEqual(initialState);
        });

        test('auth state changed', () => {
            const payload = { user: { dimension: 137 }, hasAuth: true };
            const currentState = { user: null, hasAuth: false, isLoading: true };
            const expectedState = Object.assign({}, payload, { isLoading: true });
            const authStateChangedAction = createMockAction(AUTH_STATE_CHANGED, payload);
            expect(authReducer(currentState, authStateChangedAction)).toEqual(expectedState);
        });

        test('done loading', () => {
            const payload = { user: null, hasAuth: false };
            const currentState = { user: null, hasAuth: false, isLoading: true };
            const expectedState = Object.assign({}, payload, { isLoading: false });
            const doneLoadingAction = createMockAction(DONE_LOADING, payload);
            expect(authReducer(currentState, doneLoadingAction)).toEqual(expectedState);
        });
    });
});
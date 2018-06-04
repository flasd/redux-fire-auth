import 'dotenv/config';
import firebase from 'firebase';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import createAuthEnhancer, {
    AUTH_STATE_CHANGED,
    DONE_LOADING,
    authReducer,
} from './index';

function getTag(value) {
    return Object.prototype.toString.call(value);
}

describe('middleware', () => {
    test('createAuthEnhancer function', () => {
        const callbacks = [];
        const mockAuthInstance = {
            onAuthStateChanged: jest.fn(cb => callbacks.push(cb)),
        };

        const mockStore = {
            dispatch: jest.fn(),
            getState: jest.fn(() => ({ auth: { isLoading: false } })),
        }

        expect(getTag(createAuthEnhancer)).toBe('[object Function]');

        expect(() => createAuthEnhancer(null)).toThrow(/firebase/);
        expect(() => createAuthEnhancer(mockAuthInstance, 2)).toThrow(/reducerKey/);

        const middleware = createAuthEnhancer(mockAuthInstance);
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
        expect(getTag(authReducer)).toBe('[object Function]');
    });

    test('integration', async () => {
        /*
         * To run this test you will need:
         * - Firebase project with email and password login turned on.
         * - Project credentials in the environment.
         * - Working (and preferably fast) internet connection.
         */
        const app = firebase.initializeApp({
                apiKey: process.env.API_KEY,
                authDomain: process.env.AUTH_DOMAIN,
                projectId: process.env.PROJECT_ID,
        });

        const middleware = createAuthEnhancer(app.auth());
        const reducer = combineReducers({ auth: authReducer });
        const store = createStore(reducer, applyMiddleware(middleware));

        await app.auth().signInAndRetrieveDataWithEmailAndPassword(
            process.env.AUTH_EMAIL,
            process.env.AUTH_PASSWORD,
        );

        const state = store.getState();
        expect(state).toHaveProperty('auth');

        const { auth } = state;
        expect(auth).toHaveProperty('isLoading', false);
        expect(auth).toHaveProperty('hasAuth', true);
        expect(auth).toHaveProperty('user');
    });
});
/* eslint-env node, mocha */

import { expect } from 'chai';

import {
    DONE_LOADING,
    AUTH_STATE_CHANGED,
    doneLoading,
    authStateChanged,
    initialState,
    reduxFireAuthReducer,
    init,
} from './index';

describe('ReduxFireAuth module', () => {
    describe('action types', () => {
        it('should be a string', () => {
            expect(DONE_LOADING).to.be.a('string');
            expect(AUTH_STATE_CHANGED).to.be.a('string');
        });

        it('should be spelt correctly', () => {
            expect(DONE_LOADING).to.equal('@REDUX_FIRE_AUTH__DONE_LOADING');
            expect(AUTH_STATE_CHANGED).to.equal('@REDUX_FIRE_AUTH__AUTH_STATE_CHANGED');
        });
    });

    describe('action creators', () => {
        it('should be a function', () => {
            expect(doneLoading).to.be.a('function');
            expect(authStateChanged).to.be.a('function');
        });

        it('should return valid actions', () => {
            const doneLoadingExpectedReturn = { type: '@REDUX_FIRE_AUTH__DONE_LOADING', hasAuth: false, user: null };
            expect(doneLoading(null)).to.deep.equal(doneLoadingExpectedReturn);

            const authStateChangedExpectedReturn = { type: '@REDUX_FIRE_AUTH__AUTH_STATE_CHANGED', hasAuth: false, user: null };
            expect(authStateChanged(null)).to.deep.equal(authStateChangedExpectedReturn);
        });

        it('should respond correctly to auth state changes', () => {
            expect(doneLoading({ toJSON: () => ({ name: 'Sup' }) })).to.have.property('hasAuth', true);
            expect(doneLoading(null)).to.have.property('hasAuth', false);

            expect(authStateChanged({ toJSON: () => ({ name: 'Sup' }) })).to.have.property('hasAuth', true);
            expect(authStateChanged(null)).to.have.property('hasAuth', false);
        });
    });

    describe('initial state', () => {
        it('should have all the needed props', () => {
            expect(initialState).to.deep.equal({ isLoading: true, hasAuth: false, user: null });
        });
    });

    describe('reducer', () => {
        it('should be a function', () => {
            expect(reduxFireAuthReducer).to.be.a('function');
        });

        it('should initialize the state correctly', () => {
            const randomAction = { type: 'SOME_RANDOM_ACTION' };
            const expectedState = { isLoading: true, hasAuth: false, user: null };
            expect(reduxFireAuthReducer(undefined, randomAction)).to.deep.equal(expectedState);
        });

        it('should change the state correctly', () => {
            const randomAction = { type: 'SOME_RANDOM_ACTION' };
            expect(reduxFireAuthReducer({}, randomAction)).to.deep.equal({});

            const doneLoadingAction = doneLoading(null);
            const expectedState1 = { isLoading: false, hasAuth: false, user: null };
            const output1 = reduxFireAuthReducer(undefined, doneLoadingAction);
            expect(output1).to.deep.equal(expectedState1);

            const authStateChangedAction = authStateChanged({ toJSON: () => ({ name: 'Sup' }) });
            const expectedState2 = { isLoading: true, hasAuth: true, user: { name: 'Sup' } };
            const output2 = reduxFireAuthReducer(undefined, authStateChangedAction);
            expect(output2).to.deep.equal(expectedState2);
        });
    });

    describe('initializer', () => {
        it('should be a function', () => {
            expect(init).to.be.a('function');
        });

        it('should call the authInstance "onAuthStateChanged" method with a function', () => {
            const listeners = [];

            const authInstanceMock = {
                onAuthStateChanged: fn => listeners.push(fn),
            };

            const storeMock = {
                getState: () => undefined,
                dispatch: () => undefined,
            };

            init(storeMock, authInstanceMock);

            expect(listeners).to.have.lengthOf(1);
        });

        it('should dispatch actions when the listener fires', () => {
            const listeners = [];

            const authInstanceMock = {
                onAuthStateChanged: fn => listeners.push(fn),
            };

            let called = false;

            const storeMock = {
                getState: () => ({ fireAuth: { isLoading: true, hasAuth: false, user: null } }),
                dispatch: (action) => { called = action; },
            };


            init(storeMock, authInstanceMock);
            listeners[0](null);

            expect(called).to.deep.equal(doneLoading(null));

            storeMock
                .getState = () => ({ fireAuth: { isLoading: false, hasAuth: false, user: null } });

            listeners[0](null);

            expect(called).to.deep.equal(authStateChanged(null));
        });

        it('should accept a diferent reducer key', () => {
            const listeners = [];

            const authInstanceMock = {
                onAuthStateChanged: fn => listeners.push(fn),
            };

            const storeMock = {
                getState: () => ({ diferentKey: { isLoading: true, hasAuth: false, user: null } }),
                dispatch: () => undefined,
            };

            init(storeMock, authInstanceMock, 'diferentKey');
            expect(() => listeners[0](null)).to.not.throw();
        });
    });
});

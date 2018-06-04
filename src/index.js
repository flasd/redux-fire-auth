import assert from './assert';
import {
    AUTH_STATE_CHANGED,
    DONE_LOADING,
    authStateChanged,
    doneLoading,
} from './actions';

export default function createAuthMiddleware(authInstance, reducerKey = 'auth') {
    assert(
        authInstance && authInstance.onAuthStateChanged,
        `Expected firebase auth instance instead got ${JSON.stringify(authInstance)}`,
    );

    assert(
        Object.prototype.toString.call(reducerKey) === '[object String]',
        `Expected reducerKey to be a string but instead got ${typeof reducerKey}`,
    );

    return function authMiddleware(store) {
        authInstance.onAuthStateChanged((user) => {
            if (store.getState()[reducerKey].isLoading) {
                return store.dispatch(doneLoading(user));
            }

            return store.dispatch(authStateChanged(user));
        });

        return next => action => next(action);
    };
}

export { AUTH_STATE_CHANGED };
export { DONE_LOADING };

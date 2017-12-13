export const DONE_LOADING = '@REDUX_FIRE_AUTH__DONE_LOADING';
export const AUTH_STATE_CHANGED = '@REDUX_FIRE_AUTH__AUTH_STATE_CHANGED';

/**
 *
 * @param {user | null} user The user object
 */
export function doneLoading(user) {
    return {
        type: DONE_LOADING,
        hasAuth: !!user,
        user,
    };
}

/**
 *
 * @param {user | null} user The user object
 */
export function authStateChanged(user) {
    return {
        type: AUTH_STATE_CHANGED,
        hasAuth: !!user,
        user,
    };
}

export const initialState = {
    isLoading: true,
    hasAuth: false,
    user: null,
};

/**
 *
 * @param {object} state the redux state
 * @param {action} action the redux action
 */
export function reduxFireAuthReducer(state = initialState, action) {
    switch (action.type) {
        case DONE_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
                hasAuth: action.hasAuth,
                user: action.user,
            });

        case AUTH_STATE_CHANGED:
            return Object.assign({}, state, {
                hasAuth: action.hasAuth,
                user: action.user,
            });

        default:
            return state;
    }
}

/**
 *
 * @param {store} store The redux store,
 * @param {authInstance} authInstance Firebase Auth instance, NOT THE CONSTRUCTOR!!
 * @param {string?} reducerKey The key in witch the reducer was bound with combine reducers.
 */
export function init(store, authInstance, reducerKey = 'fireAuth') {
    authInstance.onAuthStateChanged((user) => {
        if (store.getState()[reducerKey].isLoading) {
            store.dispatch(doneLoading(user));
        } else {
            store.dispatch(authStateChanged(user));
        }
    });
}

export const DONE_LOADING = '@@redux-fire-auth/done-loading';
export const AUTH_STATE_CHANGED = '@@redux-fire-auth/auth-state-changed';

/**
 * Creates the doneLoading action.
 * @param {Object|null} user The firebase user object.
 * @returns {object} The action.
 */
export function doneLoading(user) {
    return {
        type: DONE_LOADING,
        hasAuth: !!user,
        user: user && user.toJSON(),
    };
}

/**
 * Creates the authStateChanged action.
 * @param {Object|null} user The firebase user object.
 * @returns {Object} The action.
 */
export function authStateChanged(user) {
    return {
        type: AUTH_STATE_CHANGED,
        hasAuth: !!user,
        user: user && user.toJSON(),
    };
}

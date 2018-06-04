import { AUTH_STATE_CHANGED, DONE_LOADING } from '../actions';

export const initialState = {
    isLoading: true,
    hasAuth: false,
    user: null,
};

/**
 * The reducer to process state changes.
 * @param {Object} state the redux state
 * @param {Object} action the redux action
 * @returns {Object} The new state;
 */
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_STATE_CHANGED:
            return Object.assign({}, state, {
                hasAuth: action.payload.hasAuth,
                user: action.payload.user,
            });

        case DONE_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
                hasAuth: action.payload.hasAuth,
                user: action.payload.user,
            });

        default:
            return state;
    }
}

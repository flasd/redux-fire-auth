(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.doneLoading = doneLoading;
    exports.authStateChanged = authStateChanged;
    exports.reduxFireAuthReducer = reduxFireAuthReducer;
    exports.init = init;
    var DONE_LOADING = exports.DONE_LOADING = '@REDUX_FIRE_AUTH__DONE_LOADING';
    var AUTH_STATE_CHANGED = exports.AUTH_STATE_CHANGED = '@REDUX_FIRE_AUTH__AUTH_STATE_CHANGED';

    /**
     *
     * @param {user | null} user The user object
     */
    function doneLoading(user) {
        return {
            type: DONE_LOADING,
            hasAuth: !!user,
            user: user && user.toJSON()
        };
    }

    /**
     *
     * @param {user | null} user The user object
     */
    function authStateChanged(user) {
        return {
            type: AUTH_STATE_CHANGED,
            hasAuth: !!user,
            user: user && user.toJSON()
        };
    }

    var initialState = exports.initialState = {
        isLoading: true,
        hasAuth: false,
        user: null
    };

    /**
     *
     * @param {object} state the redux state
     * @param {action} action the redux action
     */
    function reduxFireAuthReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        switch (action.type) {
            case DONE_LOADING:
                return Object.assign({}, state, {
                    isLoading: false,
                    hasAuth: action.hasAuth,
                    user: action.user
                });

            case AUTH_STATE_CHANGED:
                return Object.assign({}, state, {
                    hasAuth: action.hasAuth,
                    user: action.user
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
    function init(store, authInstance) {
        var reducerKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fireAuth';

        authInstance.onAuthStateChanged(function (user) {
            if (store.getState()[reducerKey].isLoading) {
                store.dispatch(doneLoading(user));
            } else {
                store.dispatch(authStateChanged(user));
            }
        });
    }
});
//# sourceMappingURL=index.js.map
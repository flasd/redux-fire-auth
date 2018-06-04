(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reduxFireAuth"] = factory();
	else
		root["reduxFireAuth"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doneLoading = doneLoading;
exports.authStateChanged = authStateChanged;
var DONE_LOADING = exports.DONE_LOADING = '@@redux-fire-auth/done-loading';
var AUTH_STATE_CHANGED = exports.AUTH_STATE_CHANGED = '@@redux-fire-auth/auth-state-changed';

/**
 * Creates the doneLoading action.
 * @param {Object|null} user The firebase user object.
 * @returns {object} The action.
 */
function doneLoading(user) {
    return {
        type: DONE_LOADING,
        payload: {
            hasAuth: !!user,
            user: user && user.toJSON()
        }
    };
}

/**
 * Creates the authStateChanged action.
 * @param {Object|null} user The firebase user object.
 * @returns {Object} The action.
 */
function authStateChanged(user) {
    return {
        type: AUTH_STATE_CHANGED,
        payload: {
            hasAuth: !!user,
            user: user && user.toJSON()
        }
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = undefined;
exports.default = authReducer;

var _actions = __webpack_require__(0);

var initialState = exports.initialState = {
    isLoading: true,
    hasAuth: false,
    user: null
};

/**
 * The reducer to process state changes.
 * @param {Object} state the redux state
 * @param {Object} action the redux action
 * @returns {Object} The new state;
 */
function authReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.AUTH_STATE_CHANGED:
            return Object.assign({}, state, {
                hasAuth: action.payload.hasAuth,
                user: action.payload.user
            });

        case _actions.DONE_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
                hasAuth: action.payload.hasAuth,
                user: action.payload.user
            });

        default:
            return state;
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = assert;
/**
 * Asserts given condition.
 * @private
 * @param {boolean} condition The condition to assert validity of.
 * @param {string|undefined} message The error message to display during development.
 */
function assert(condition, message) {
    if (!condition) {
        var errorMessage =  true ? 'redux-fire-auth error. Use dev environment for the full error message.' : undefined;

        throw new Error(errorMessage);
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authReducer = exports.DONE_LOADING = exports.AUTH_STATE_CHANGED = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createAuthEnhancer;

var _assert = __webpack_require__(2);

var _assert2 = _interopRequireDefault(_assert);

var _actions = __webpack_require__(0);

var _reducer = __webpack_require__(1);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAuthEnhancer(authInstance) {
    var reducerKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auth';

    (0, _assert2.default)(authInstance && authInstance.onAuthStateChanged, 'Expected firebase auth instance instead got ' + JSON.stringify(authInstance));

    (0, _assert2.default)(Object.prototype.toString.call(reducerKey) === '[object String]', 'Expected reducerKey to be a string but instead got ' + (typeof reducerKey === 'undefined' ? 'undefined' : _typeof(reducerKey)));

    return function authMiddleware(store) {
        authInstance.onAuthStateChanged(function (user) {
            if (store.getState()[reducerKey].isLoading) {
                return store.dispatch((0, _actions.doneLoading)(user));
            }

            return store.dispatch((0, _actions.authStateChanged)(user));
        });

        return function (next) {
            return function (action) {
                return next(action);
            };
        };
    };
}

exports.AUTH_STATE_CHANGED = _actions.AUTH_STATE_CHANGED;
exports.DONE_LOADING = _actions.DONE_LOADING;
exports.authReducer = _reducer2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});
//# sourceMappingURL=redux-fire-auth.js.map
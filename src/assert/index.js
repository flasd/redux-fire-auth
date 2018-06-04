/**
 * Asserts given condition.
 * @private
 * @param {boolean} condition The condition to assert validity of.
 * @param {string|undefined} message The error message to display during development.
 */
export default function assert(condition, message) {
    if (!condition) {
        const errorMessage = process.env.NODE_ENV === 'production' ?
            'redux-fire-auth error. Use dev environment for the full error message.' : `redux-fire-auth error. ${message}`;

        throw new Error(errorMessage);
    }
}

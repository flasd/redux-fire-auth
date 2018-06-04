import {
    AUTH_STATE_CHANGED,
    DONE_LOADING,
    authStateChanged,
    doneLoading,
} from './index';

function getTag(value) {
    return Object.prototype.toString.call(value);
}

describe('actions', () => {
    test('AUTH_STATE_CHANGED constant', () => {
        expect(getTag(AUTH_STATE_CHANGED)).toBe('[object String]');
        expect(AUTH_STATE_CHANGED).toMatch(/@@redux-fire-auth\/auth-state-changed/);
    });

    test('DONE_LOADING constant', () => {
        expect(getTag(DONE_LOADING)).toBe('[object String]');
        expect(DONE_LOADING).toMatch(/@@redux-fire-auth\/done-loading/);
    });

    test('authStateChanged function', () => {
        expect(getTag(authStateChanged)).toBe('[object Function]');

        const returnsWithAuth = authStateChanged({ toJSON: () => ({ dimension: 137 }) });
        expect(returnsWithAuth).toHaveProperty('type', AUTH_STATE_CHANGED);
        expect(returnsWithAuth).toHaveProperty('payload');
        expect(returnsWithAuth.payload).toHaveProperty('hasAuth', true);
        expect(returnsWithAuth.payload).toHaveProperty('user', { dimension: 137 });

        const returnsWithoutAuth = authStateChanged(null);
        expect(returnsWithoutAuth).toHaveProperty('type', AUTH_STATE_CHANGED);
        expect(returnsWithoutAuth).toHaveProperty('payload');
        expect(returnsWithoutAuth.payload).toHaveProperty('hasAuth', false);
        expect(returnsWithoutAuth.payload).toHaveProperty('user', null);
    });

    test('doneLoading function', () => {
        expect(getTag(doneLoading)).toBe('[object Function]');

        const returnsWithAuth = doneLoading({ toJSON: () => ({ dimension: 137 }) });
        expect(returnsWithAuth).toHaveProperty('type', DONE_LOADING);
        expect(returnsWithAuth).toHaveProperty('payload');
        expect(returnsWithAuth.payload).toHaveProperty('hasAuth', true);
        expect(returnsWithAuth.payload).toHaveProperty('user', { dimension: 137 });

        const returnsWithoutAuth = doneLoading(null);
        expect(returnsWithoutAuth).toHaveProperty('type', DONE_LOADING);
        expect(returnsWithoutAuth).toHaveProperty('payload');
        expect(returnsWithoutAuth.payload).toHaveProperty('hasAuth', false);
        expect(returnsWithoutAuth.payload).toHaveProperty('user', null);
    });
});
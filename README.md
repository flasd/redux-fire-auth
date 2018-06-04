# redux-fire-auth
Helper to keep the Redux State in sync with the Firebase Auth State.

[![Build Status](https://travis-ci.org/flasd/react-classlist-helper.svg?branch=master)](https://travis-ci.org/flasd/redux-fire-auth) [![Coverage Status](https://coveralls.io/repos/github/flasd/redux-fire-auth/badge.svg?branch=master)](https://coveralls.io/github/flasd/redux-fire-auth?branch=master) [![npm version](https://badge.fury.io/js/redux-fire-auth.svg)](https://www.npmjs.com/package/redux-fire-auth)


### Why?
When you start playing with Firebase auth, you will soon realize that when the page refreshes, you loose authentication state until the SDK kicks back in.

Wouldn't it be nice if you could tell if the Firebase SDK have finished initializing and if there's a logged in user? Well :wink:


### Setup

First, obviously,
```
$ npm install redux-fire-auth firebase redux --save
```

Then just initialize it:

```javascript
import firebase from 'firebase';
import { applyMiddleware, createStore, combineReducers } from 'redux';

// This is us!
import createAuthEnhancer, { authReducer } from 'redux-fire-auth';

import * as yourReducers from './your-reducers.js';

// ...

// Initialize your firebase app.
const app = firebase.initializeApp({/* Firebase Configs */});
const auth = app.auth();

// Combine your reducers with ours \o/
const reducer = combineReducers({
    auth: authReducer,
    ...yourReducers,
});

// Build the middleware.
const authMiddleware = createAuthEnhancer(auth);

// Create your store.
const store = createStore(reducer, applyMiddleware(authMiddleware));

// Yup. That easy.
```
This enhancer will bind to Firebase's `onAuthStateChanged` with action creators. Whenever there's an authStateChanged event, the redux state will sync automatically.

### API exports
You can listen to actions inside your own reducers by importing the action types `{ AUTH_STATE_CHANGED, DONE_LOADING }`. Actions are [FSA](https://github.com/redux-utilities/flux-standard-action) compliant.


**Note:** If you'd want to use something other than `auth` to bind the reducer to, you need to pass the key you want to use to `createAuthEnhancer(authInstance, key)` as the second argument.

### Usage

When you call `store.getState().auth` you'll get an object with three properties:
##### isLoading: bool
True while the Firebase SDK is initializing, then always false.

##### hasAuth: bool
False while the Firebase SDK is initializing, then if the SDK recovers the session it's true, else it stays false.

##### user: Firebase.User | null
null while the Firebase SDK is initializing, then if the SDK recovers the session it's the User.toJSON() object, without the User methods provided by firebase, else it stays null.

### Example
I'm assuming you know how to work with React and React-Redux for this example :grin:
```javascript
import React from 'react';
import { connect } from 'react-redux';

export function App({ isLoading, hasAuth, user }) {
	if (isLoading) {
    	return (
        	<div> Loading... </div>
        );
    }
    
    if (hasAuth) {
    	return (
        	<div> Hello { user.displayName } </div>
        );
    }
    
    return (
    	<div> Please sign in. </div>
    );
}

export default connect(({ auth }) => auth)(App);
```

If you've liked this, consider giving it a :star:!

### Licence
MIT all the way. Let's create awesome stuff! :rocket:
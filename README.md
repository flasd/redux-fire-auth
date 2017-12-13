# redux-fire-auth
Helper to keep the Redux State in sync with the Firebase Auth State.

[![Build Status](https://travis-ci.org/flasd/react-classlist-helper.svg?branch=master)](https://travis-ci.org/flasd/redux-fire-auth) [![Coverage Status](https://coveralls.io/repos/github/flasd/redux-fire-auth/badge.svg?branch=master)](https://coveralls.io/github/flasd/redux-fire-auth?branch=master) [![npm version](https://badge.fury.io/js/redux-fire-auth.svg)](https://www.npmjs.com/package/redux-fire-auth) [![npm](https://img.shields.io/badge/Licence-MIT-blue.svg)](https://github.com/flasd/redux-fire-auth/blob/master/LICENSE) [![code style](https://img.shields.io/badge/Code%20Style-Airbnb-orange.svg)](https://www.npmjs.com/package/eslint-config-airbnb)


### Why?
When you start playing with Firebase auth, you will soon realize that when the page refreshes, you loose authentication state until the SDK kicks back in.

Wouldn't it be nice if you could tell if the Firebase SDK have finished initializing and if there's a logged in user? Well :wink:


### Setup

First, obviously,
```
$ npm install redux-fire-auth --save
```

Then, you'll need 2 things:

```javascript
import { auth } from 'firebase';
import { createStore, combineReducers } from 'redux';
import { reduxFireAuthReducer, init } from 'redux-fire-auth';

import * as yourReducers from './your-reducers.js';

const store = createStore(
	combineReducers({
    	'fireAuth': reduxFireAuthReducer,
        /* 	If you want to use something other that 'fireAuth'
        	you have to pass the key you're using as the third
            argument when calling the init function.
        */
        ...yourReducers,
    }),
);

init(store, auth() /*, state key to bind the reducer to */);
```
The `init` function binds Firebase's `onAuthStateChanged` with action creators. Whenever there's a authStateChanged event, the redux state will sync automatically.

### Usage

When you call `store.getState().fireAuth` you'll get an object with three properties:
##### isLoading: bool
True while the Firebase SDK is initializing, then always false.

##### hasAuth: bool
False while the Firebase SDK is initializing, then if the SDK recovers the session it's true, else it stays false.

#### user: Firebase.User | null
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

export function mapStateToProps(state) {
	return state.fireAuth;
}

export default connect(mapStateToProps)(App);
```

### Licence
MIT all the way. Let's create awesome stuff! :rocket:
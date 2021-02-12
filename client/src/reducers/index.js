import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authReducer from './auth.js';
import moduleReducer from './module.js';
import topicReducer from './topic.js';
import slideReducer from './slide.js';

const config = {
    key: 'auth',
    storage, 
    whitelist: [ 'auth' ]
}

const reducer = combineReducers({
    auth: authReducer,
    module: moduleReducer,
    topic: topicReducer,
    slide: slideReducer
});

export default persistReducer(config, reducer);

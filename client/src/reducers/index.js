import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authReducer from './auth.js';
import moduleReducer from './module.js';
import topicReducer from './topic.js';
import slideReducer from './slide.js';
import infoReducer from './info.js';
import explanationReducer from './explanation.js';

const config = {
    key: 'auth',
    storage,
    whitelist: ['auth']
};

const reducer = combineReducers({
    auth: authReducer,
    module: moduleReducer,
    topic: topicReducer,
    slide: slideReducer,
    info: infoReducer,
    explanation: explanationReducer
});

export default persistReducer(config, reducer);

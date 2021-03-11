import { persistStore } from 'redux-persist';
import { createStore } from 'redux';

import reducers from './reducers';

const store = createStore(reducers);
const persistor = persistStore(store);

export { store, persistor };

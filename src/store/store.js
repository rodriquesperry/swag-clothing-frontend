import logger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root_reducer';
import { thunk } from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [
	import.meta.env.DEV === true && logger,
	thunk,
].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));

// You need a rootReducer to generate a store. We chose undefined for the second (optional)
// argument because it is used for additional state values, which we have none as of now.
// enhancers is always the third argument.
export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);
export const persistor = persistStore(store);

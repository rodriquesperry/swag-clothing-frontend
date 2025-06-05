import logger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import { loggerMiddleware } from './middleware/logger';
// import { thunk } from 'redux-thunk';
import { rootSaga } from './root_saga';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root_reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'], // You can whitelist or blacklist items.
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [
	import.meta.env.DEV === true && logger,
	// thunk,
  sagaMiddleware,
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

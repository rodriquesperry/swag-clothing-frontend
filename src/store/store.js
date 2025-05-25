import { compose, createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root_reducer'; 

// custom logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type:: ', action.type);
  console.log('payload:: ', action.payload);
  console.log('currentState:: ', store.getState());

  next(action);
  
  console.log('next state:: ', store.getState());
}

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// You need a rootReducer to generate a store. We chose undefined for the second (optional) 
// argument because it is used for additional state values, which we have none as of now. 
// enhancers is always the third argument.
export const store = createStore(rootReducer, undefined, composedEnhancers); 


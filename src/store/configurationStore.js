import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

export default (initialState = {}) => {
  const middlewares = [thunk];
  
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
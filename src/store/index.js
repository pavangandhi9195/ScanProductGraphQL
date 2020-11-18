import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/reducers';
import { createLogger } from 'redux-logger';
import createApiMiddleware from './apiMiddleware';
import ApiClient from './ApiClient';
import { Config } from '@common';

/*========================================================
    * function Name: createStore
    * function Purpose: call all midddleWare and reducers
    * function Parameters: reducers, midddleWare
    * function ReturnType: store
    * function Description: createStore using midddleWare and reducers
    *=====================================================*/

const apiClient = new ApiClient({ baseURL: Config.defaultUrl });
const apiMiddleware = createApiMiddleware(apiClient);

const middleWare = [
  thunk,
  apiMiddleware
];
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware)

const store = createStore(reducers, applyMiddleware(...middleWare));

export default store;

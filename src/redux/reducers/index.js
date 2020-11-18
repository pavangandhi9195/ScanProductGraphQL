
import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

import * as types from '../actions/types';

const appReducer = combineReducers({
  product: productReducer,
  category: categoryReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = initialState
  }
  return appReducer(state, action)
}

export default rootReducer;
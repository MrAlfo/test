import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mainReducer from './mainSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer
});

export default rootReducer;

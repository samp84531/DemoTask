import { combineReducers } from 'redux';
import register from './reducers/RegisterReducer';
import login from './reducers/LoginReducer';
import joinChannelReducer from './reducers/JoinChannelReducer';
import fetchChannelReducer from './reducers/FetchChannelReducer';

const rootReducer = combineReducers({
  register,
  login,
  joinChannelReducer,
  fetchChannelReducer
});

export default rootReducer;
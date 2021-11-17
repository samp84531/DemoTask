import { LOAD_LOGGED_IN_USER_DATA, CLEAR_LOGGED_IN_USER_DATA } from '../actionTypes';

const initialSettings = {
  loggedInUser: {}
};

const LoginReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_LOGGED_IN_USER_DATA:
      return {
        ...state,
        loggedInUser: action.userData
      };
    case CLEAR_LOGGED_IN_USER_DATA:
      return {
        ...state,
        loggedInUser: action.userData
      };
    default:
      return state;
  }
};

export default LoginReducer;
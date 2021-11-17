import * as types from '../actionTypes';
import { fetchLoginData, logoutUserFromStorage } from '../../utils/asyncStore'

export const storeUserAccess = (userData) => {
  return { type: types.LOAD_LOGGED_IN_USER_DATA, userData};
}

export const fetchLoggedInData = () => {
  return dispatch => {
    fetchLoginData()
      .then((userData) => {
        if (userData) {
          return dispatch(storeUserAccess(userData))
        }
      })
      .catch(err => console.log(err))
  }
}

export const clearLoggedInUserdata = () => {
  return { type: types.CLEAR_LOGGED_IN_USER_DATA, userData: {}};
}

export const logoutUser = () => {
  return dispatch => {
    logoutUserFromStorage()
    .then(() => {
      return dispatch(clearLoggedInUserdata())
    })
  }
}
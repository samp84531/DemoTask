import * as types from '../actionTypes';
// create  fetchChannelAction 
export const fetchChannel = (data) => {
  return { type: types.LOAD_CHANNEL, data};
}


export const fetchChannelAction = (data) => {
  return dispatch => {
    dispatch(fetchChannel(data)) 
  }
}
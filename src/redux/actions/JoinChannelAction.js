// create joinChannelAction
import * as types from '../actionTypes';

export const joinChannel = (data) => {
  return { type: types.JOIN_CHANNEL, data};
}


export const joinChannelAction = (data) => {
  return dispatch => {
    dispatch(joinChannel(data)) 
  }
}
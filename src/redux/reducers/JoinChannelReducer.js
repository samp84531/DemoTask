// create joinChannelReducer
import { JOIN_CHANNEL } from '../actionTypes';

const initialSettings = {
  data: {}
};

const joinChannelReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case JOIN_CHANNEL:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default joinChannelReducer;
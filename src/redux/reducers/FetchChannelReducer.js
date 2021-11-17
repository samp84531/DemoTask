// create fetchChannelReducer
import { LOAD_CHANNEL } from '../actionTypes';

const initialSettings = {
  data: {}
};

const fetchChannelReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_CHANNEL:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default fetchChannelReducer;
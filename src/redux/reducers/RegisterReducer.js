import { LOAD_SELECTED_SPORTS, LOAD_SELECTED_TEAMS } from '../actionTypes';

const initialSettings = {
  selectedSports: [],
  selectedTeams: []
};

const RegisterReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case LOAD_SELECTED_SPORTS:
      return {
        ...state,
        selectedSports: action.sports
      };
    case LOAD_SELECTED_TEAMS:
      return {
        ...state,
        selectedTeams: action.teams
      };
    default:
      return state;
  }
};

export default RegisterReducer;
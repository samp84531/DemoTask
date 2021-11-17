import * as types from '../actionTypes';

export const loadSelectedSports = (sports) => {
  return { type: types.LOAD_SELECTED_SPORTS, sports};
}

export const loadSelectedTeams = (teams) => {
  return { type: types.LOAD_SELECTED_TEAMS, teams}
}

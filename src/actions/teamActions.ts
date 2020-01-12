import { Thunk } from "../store";
import apiService from "src/services/ApiService";

import { AppState } from "src/types/StoreTypes";
import { FetchTeams, FetchTeamsFailure, FetchTeamsSuccess, Team, TeamsState } from 'src/types/TeamTypes';

function shouldFetchTeams({ teams }: AppState) {
  return !teams.isFetching && !teams.isFetched;
}

function fetchTeams(): FetchTeams {
  return {
    type: 'FETCH_TEAMS'
  }
}

function fetchTeamsSuccess(items: TeamsState['items']): FetchTeamsSuccess {
  return {
    type: 'FETCH_TEAMS_SUCCESS',
    payload: {
      items
    }
  }
}

function fetchTeamsFailure(error: string): FetchTeamsFailure {
  return {
    type: 'FETCH_TEAMS_FAILURE',
    payload: {
      error
    }
  }
}

function tryFetchTeams(): Thunk<any> {
  return async dispatch => {
    dispatch(fetchTeams());

    try {
      const { data } = await apiService.get<any[]>('/teams');

      const teams = data.reduce((teams, team) => {
        return {
          ...teams,
          [team.id]: {
            needsFetching: true,
            item: team
          }
        }
      }, {} as TeamsState['items']);

      dispatch(fetchTeamsSuccess(teams))
    } catch (e) {
      dispatch(fetchTeamsFailure(e.message))
    }
  }
}

export function fetchIfNeeded(): Thunk<any> {
  return async (dispatch, getState) => {
    const state = getState();

    if (!shouldFetchTeams(state)) {
      return;
    }

    await dispatch(tryFetchTeams());
  }
}

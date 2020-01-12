import { FetchableState, FetchableStateItem } from "./StoreTypes";

// OBJECTS
export interface Team {
  id: string;
  name: string;
  members: Array<{
    user: string;
    is_admin: boolean;
  }>
}

// STATE
export type TeamsState = FetchableState<Team>;

// ACTIONS
export type FetchTeams = {
  type: 'FETCH_TEAMS'
}

export type FetchTeamsSuccess = {
  type: 'FETCH_TEAMS_SUCCESS',
  payload: {
    items: TeamsState['items']
  }
}

export type FetchTeamsFailure = {
  type: 'FETCH_TEAMS_FAILURE',
  payload: {
    error: string
  }
}

export type FetchTeam = {
  type: 'FETCH_TEAM',
  payload: {
    id: string;
  }
}

export type FetchTeamSuccess = {
  type: 'FETCH_TEAM_SUCCESS',
  payload: {
    id: string;
    item: FetchableStateItem<Team>;
  }
}

export type FetchTeamFailure = {
  type: 'FETCH_TEAM_FAILURE',
  payload: {
    id: string;
    error: string;
  }
}

export type AllTeamActions =
  FetchTeam | FetchTeamSuccess | FetchTeamFailure |
  FetchTeams | FetchTeamsSuccess | FetchTeamsFailure;

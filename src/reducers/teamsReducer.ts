import { AllTeamActions, TeamsState } from "src/types/TeamTypes";
import { createFetchableState } from "src/store";

const initialState: TeamsState = createFetchableState();

function teamsReducer(state = initialState, action: AllTeamActions): TeamsState {

  switch (action.type) {
    case "FETCH_TEAMS" : {
      return { ...state, isFetching: true }
    }

    case "FETCH_TEAMS_SUCCESS" : {
      return { ...state, isFetching: false, items: action.payload.items, isFetched: true }
    }

    case "FETCH_TEAMS_FAILURE" : {
      return { ...state, isFetching: false, error: action.payload.error }
    }
  }

  return state ?? initialState;
};

export default teamsReducer;

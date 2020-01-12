import { AllUserActions, UsersState } from "../types/UserTypes";
import { createFetchableState } from "../store";

const initialState: UsersState = createFetchableState();

function usersReducer(state = initialState, action: AllUserActions) {
  switch (action.type) {
    case "FETCH_USERS" : {
      return { ...state, isFetching: true }
    }

    case "FETCH_USERS_SUCCESS" : {
      return { ...state, isFetching: false, items: action.payload.items, isFetched: true }
    }

    case "FETCH_USERS_FAILURE" : {
      return { ...state, isFetching: false, error: action.payload.error }
    }
  }

  return state ?? initialState;
};

export default usersReducer;

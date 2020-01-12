import { AllEventActions, EventsState } from "../types/EventTypes";
import { createFetchableState } from "../store";
import { Reducer } from "react";

const initialState: EventsState = createFetchableState();

function eventsReducer(state = initialState, action: AllEventActions): EventsState {
  switch (action.type) {
    case "FETCH_EVENTS" : {
      return { ...state, isFetching: true }
    }

    case "FETCH_EVENTS_SUCCESS" : {
      const { items } = action.payload;
      return { ...state, isFetching: false, items, isFetched: true }
    }

    case "FETCH_EVENTS_FAILURE" : {
      const { error } = action.payload;
      return { ...state, isFetching: false, error }
    }
  }

  return state ?? initialState;
};

export default eventsReducer;

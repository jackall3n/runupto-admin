import { FetchableState, FetchableStateItem } from "./StoreTypes";

// OBJECTS
export interface Event {
  id: string;
  summary: EventSummary;
  detail?: EventDetail;
}

export interface EventSummary {
  description: string;
  duration: {
    start: Date;
    end: Date;
  },
  activity_types: string[];
  participants: string[];
}

export interface EventDetail {
}

// STATE
export type EventsState = FetchableState<Event>;

// ACTIONS
export type FetchEvents = {
  type: 'FETCH_EVENTS'
}

export type FetchEventsSuccess = {
  type: 'FETCH_EVENTS_SUCCESS',
  payload: {
    items: EventsState['items']
  }
}

export type FetchEventsFailure = {
  type: 'FETCH_EVENTS_FAILURE',
  payload: {
    error: string
  }
}

export type FetchEvent = {
  type: 'FETCH_EVENT',
  payload: {
    id: string;
  }
}

export type FetchEventSuccess = {
  type: 'FETCH_EVENT_SUCCESS',
  payload: {
    id: string;
    item: FetchableStateItem<Event>;
  }
}

export type FetchEventFailure = {
  type: 'FETCH_EVENT_FAILURE',
  payload: {
    id: string;
    error: string;
  }
}

export type AllEventActions =
  FetchEvent | FetchEventSuccess | FetchEventFailure |
  FetchEvents | FetchEventsSuccess | FetchEventsFailure;

import { Thunk } from "../store";
import apiService from "src/services/ApiService";
import DateFnsUtils from '@date-io/date-fns';

import { AppState, FetchableStateItem, HashState } from "src/types/StoreTypes";
import { Event, EventsState, FetchEvents, FetchEventsFailure, FetchEventsSuccess } from 'src/types/EventTypes';

const dateFns = new DateFnsUtils();

function shouldFetchEvents({ events }: AppState) {
  return !events.isFetching && !events.isFetched;
}

function fetchEvents(): FetchEvents {
  return {
    type: 'FETCH_EVENTS'
  }
}

function fetchEventsSuccess(items: EventsState['items']): FetchEventsSuccess {
  return {
    type: 'FETCH_EVENTS_SUCCESS',
    payload: {
      items
    }
  }
}

function fetchEventsFailure(error: string): FetchEventsFailure {
  return {
    type: 'FETCH_EVENTS_FAILURE',
    payload: {
      error
    }
  }
}

function mapEventToContainer(event: any): FetchableStateItem<Event> {
  const { id, ...summary } = event;

  return {
    needsFetching: true,
    item: {
      id,
      summary: {
        ...summary,
        duration: {
          ...summary.duration,
          start: dateFns.date(summary.duration.start),
          end: dateFns.date(summary.duration.end),
        }
      }
    }
  }
}

function tryFetchEvents(): Thunk<any> {
  return async dispatch => {
    dispatch(fetchEvents());

    try {
      const { data } = await apiService.get<any[]>('/events');

      const events = data.reduce((events, event) => {
        return {
          ...events,
          [event.id]: mapEventToContainer(event)
        }
      }, {} as EventsState['items']);

      dispatch(fetchEventsSuccess(events))
    } catch (e) {
      dispatch(fetchEventsFailure(e.message))
    }
  }
}

export function fetchIfNeeded(): Thunk<any> {
  return async (dispatch, getState) => {
    const state = getState();

    if (!shouldFetchEvents(state)) {
      return;
    }

    await dispatch(tryFetchEvents());
  }
}

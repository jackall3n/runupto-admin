import { createSelector } from "reselect";
import { AppState } from "../types/StoreTypes";
import DateFnsUtils from '@date-io/date-fns';
import { Event } from '../types/EventTypes';

const dateFns = new DateFnsUtils();

export const getEventsState = ({ events }: AppState) => events.items;

export const getActiveEvents = createSelector(
  getEventsState,
  events => {
    if (!events) {
      return [] as Event[];
    }

    const today = dateFns.date();
    const items = Object.values(events);

    return items.map(({ item }) => item).filter(event => {
      const { start, end } = event.summary.duration;
      return dateFns.isAfter(today, start) && dateFns.isBefore(today, end);
    });
  }
);

export const getFutureEvents = createSelector(
  getEventsState,
  events => {
    if (!events) {
      return [] as Event[];
    }

    const today = dateFns.date();
    const items = Object.values(events);

    return items.map(({ item }) => item).filter(event => {
      const { start } = event.summary.duration;
      return dateFns.isBefore(today, start)
    })
  }
);

export const getPastEvents = createSelector(
  getEventsState,
  events => {
    if (!events) {
      return [] as Event[];
    }

    const today = dateFns.date();
    const items = Object.values(events);

    return items.map(({ item }) => item).filter(event => {
      const { end } = event.summary.duration;
      return dateFns.isAfter(today, end)
    })
  }
);

export const getEventsGroupedByStateSelector = createSelector(
  getEventsState,
  getActiveEvents,
  getFutureEvents,
  getPastEvents,
  (events, active, future, past) => ({ active, future, past })
);

export const getEventSelector = createSelector(
  getEventsState,
  (state: AppState, id: string) => id,
  (events, id) => {
    return events?.[id]?.item;
  }
);

import { createSelector } from "reselect";
import { AppState } from "../types/StoreTypes";
import { getEventsState } from "./eventSelectors";

const getUsersState = ({ users }: AppState) => users.items;

export const getUsersSelector = createSelector(
  getUsersState,
  (users) => users ? Object.values(users).map(user => user.item) : []
);

export const getUserSelector = createSelector(
  getUsersSelector,
  (state: AppState, id: string) => id,
  (users, userId) => users.find(u => u.id === userId)
);

export const getUserEventsSelector = createSelector(
  getUserSelector,
  getEventsState,
  (user, events) => {
    if (!user || !events) {
      return [];
    }

    return user.events.map(id => events[id].item);
  }
);

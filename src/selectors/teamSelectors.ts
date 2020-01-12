import { createSelector } from "reselect";
import { AppState } from "../types/StoreTypes";

export const getTeamsState = ({ teams }: AppState) => teams.items;

export const getTeamsSelector = createSelector(
  getTeamsState,
  teams => {
    return Object.values(teams).map(({ item }) => item)
  }
);

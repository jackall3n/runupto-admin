import { AppState, FetchableState } from "../types/StoreTypes";
import { ThunkAction } from "redux-thunk";

export const createFetchableState = <T>(): FetchableState<T> => ({
  isFetching: false,
  isFetched: false,
  items: {}
});

export const initialState: AppState = {
  users: createFetchableState(),
  events: createFetchableState(),
  teams: createFetchableState(),
};

export type Thunk<T> = ThunkAction<T, AppState, any, any>

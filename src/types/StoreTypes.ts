import { AllEventActions, EventsState } from "./EventTypes";
import { UsersState } from "./UserTypes";
import { AllTeamActions, TeamsState } from "./TeamTypes";
import { Store } from "redux";

export interface AppState {
  events: EventsState;
  users: UsersState;
  teams: TeamsState;
}

export type AppActions = AllTeamActions | AllEventActions;

export type AppStore = Store<AppState, AppActions>;

export interface FetchableState<T> {
  isFetching: boolean;
  isFetched: boolean;
  error?: string;
  items: HashState<FetchableStateItem<T>>;
}

export interface FetchableStateItem<T> {
  item: T,
  needsFetching: boolean;
}

export type HashState<T> = { [key: string]: T }

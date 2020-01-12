import { combineReducers } from 'redux';
import users from './usersReducer';
import events from './eventsReducer';
import teams from './teamsReducer';
import { AppState } from "../types/StoreTypes";

export default combineReducers<AppState>({
  users,
  events,
  teams
})

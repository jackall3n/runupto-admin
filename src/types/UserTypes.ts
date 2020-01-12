import { FetchableState } from "./StoreTypes";

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  events: string[];
}

export type UsersState = FetchableState<User>;

// ACTIONS
export type FetchUsers = {
  type: 'FETCH_USERS'
}

export type FetchUsersSuccess = {
  type: 'FETCH_USERS_SUCCESS',
  payload: {
    items: UsersState['items']
  }
}

export type FetchUsersFailure = {
  type: 'FETCH_USERS_FAILURE',
  payload: {
    error: string
  }
}


export type AllUserActions =
  FetchUsers | FetchUsersSuccess | FetchUsersFailure;

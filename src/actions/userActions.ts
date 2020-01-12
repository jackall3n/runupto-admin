import { Thunk } from "../store";
import { AppState, FetchableStateItem, HashState } from "../types/StoreTypes";
import apiService from "../services/ApiService";
import { User, UsersState } from '../types/UserTypes';

function shouldFetchUsers({ users }: AppState) {
  return !users.isFetching && !users.isFetched;
}

function shouldFetchUser({ users }: AppState, id: string) {
  return Boolean(users?.items?.[id]);
}

function fetchUsers() {
  return {
    type: 'FETCH_USERS'
  }
}

function fetchUsersSuccess(items: UsersState['items']) {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: {
      items
    }
  }
}

function fetchUsersFailure(error: string) {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: {
      error
    }
  }
}

function tryFetchUsers(): Thunk<any> {
  return async dispatch => {
    dispatch(fetchUsers());

    try {
      const { data } = await apiService.get<User[]>('/users');

      const users = data.reduce((users, user) => {
        return {
          ...users,
          [user.id]: {
            needsFetching: true,
            item: user
          }
        }
      }, {} as UsersState['items']);

      dispatch(fetchUsersSuccess(users))
    } catch (e) {
      dispatch(fetchUsersFailure(e.message))
    }
  }
}

export function fetchIfNeeded(): Thunk<any> {
  return async (dispatch, getState) => {
    const state = getState();

    if (!shouldFetchUsers(state)) {
      return;
    }

    await dispatch(tryFetchUsers());
  }
}

export function fetchUserIfNeeded(id: string): Thunk<any> {
  return async (dispatch, getState) => {
    const state = getState();

    // Just in case, probably remove this and make it better
    await dispatch(fetchIfNeeded());

    if (!shouldFetchUser(state, id)) {
      return;
    }

    // await dispatch(tryFetchUser(id));
  }
}

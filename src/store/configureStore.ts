import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';

import reducers from '../reducers';
import { initialState } from "./";
import { AppActions, AppState, AppStore } from "../types/StoreTypes";

const middleware = [thunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(): AppStore {
  return createStore<AppState, AppActions, any, any>(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));
}

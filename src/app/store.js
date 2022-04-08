import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import view_ticket_reducer from "../features/view_ticket/view_ticket_slice";
import create_ticket_reducer from "../features/create_ticket/create_ticlet_slice";
import customize_ticket_reducer from '../features/customize_ticket/customize_ticket_slice'
import global_state_reducer from "./globalStateSlice";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['global_state', 'customize_ticket'],
  blacklist: ['view_ticket', 'create_ticket']
};

const combinedReducers = combineReducers({
  global_state: global_state_reducer,
  counter: counterReducer,
  view_ticket: view_ticket_reducer,
  create_ticket: create_ticket_reducer,
  customize_ticket: customize_ticket_reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

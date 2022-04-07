import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import view_ticket_reducer from '../features/view_ticket/view_ticket_slice'
import create_ticket_reducer from '../features/create_ticket/create_ticlet_slice'
import global_state_reducer from './globalStateSlice'

export const store = configureStore({
  reducer: {
    global_state: global_state_reducer,
    counter: counterReducer,
    view_ticket: view_ticket_reducer,
    create_ticket: create_ticket_reducer
  },
});

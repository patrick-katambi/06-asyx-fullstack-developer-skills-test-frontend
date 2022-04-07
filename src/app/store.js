import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import view_ticket_reducer from '../features/view_ticket/view_ticket_slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    view_ticket: view_ticket_reducer,
  },
});

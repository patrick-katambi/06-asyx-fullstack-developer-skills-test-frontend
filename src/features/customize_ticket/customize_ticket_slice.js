import { createSlice } from "@reduxjs/toolkit";

export const customizeTicketSlice = createSlice({
  name: "customize_ticket",
  initialState: { ticketRow: {} },
  reducers: {
    insertTicketRow: (state, action) => {
      state.ticketRow = action.payload;
    },
  },
});

export const { insertTicketRow } = customizeTicketSlice.actions;

export const getTicketData = (state) => state.customize_ticket.ticketRow;

export default customizeTicketSlice.reducer;

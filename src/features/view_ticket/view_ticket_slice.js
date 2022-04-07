import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getRequest, postRequest } from "../../core/helper_functions";
import { urls } from "../../core/urls";

export const fetchTickets = createAsyncThunk(
  "view_ticket/fetch_ickets",
  async () => {
    const url = urls.ticket.getAll;
    const response = await getRequest({ url });
    return response;
  }
);

export const view_ticket_slice = createSlice({
  name: "view_ticket",
  initialState: {
    value: "hey",
    tickets: [],
    newTicketList: [],
    status: "idle",
  },
  reducers: {
    updateSearchResults: (state, action) => {
      state.newTicketList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets = action.payload.data;
        state.newTicketList = action.payload.data;
      });
  },
});

export const getValue = (state) => {
  return state.view_ticket.value;
};

export const getTickets = (state) => {
  return state.view_ticket.tickets;
};

export const getTicketListToDisplay = (state) => {
  return state.view_ticket.newTicketList;
};

export const getTicketFetchingStatus = (state) => {
  return state.view_ticket.status;
};

export const { updateSearchResults } = view_ticket_slice.actions;

export default view_ticket_slice.reducer;

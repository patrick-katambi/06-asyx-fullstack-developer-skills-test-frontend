import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRequest, postRequest } from '../../core/helper_functions'
import { urls } from '../../core/urls'

export const fetchTickets = createAsyncThunk(
    'view_ticket/fetch_ickets',
    async () => {
        const url = urls.ticket.getAll
        const response = await getRequest({ url })
        console.log(response)
        return response
    }
)

export const view_ticket_slice = createSlice({
    name: 'view_ticket',
    initialState: { value: 'hey', tickets: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.status = 'idle'
                state.tickets = action.payload.data
            })
    }
})

export const getValue = (state) => { return state.view_ticket.value }

export const getTickets = (state) => { return state.view_ticket.tickets }

export const getTicketFetchingStatus = (state) => { return state.view_ticket.status }

export default view_ticket_slice.reducer
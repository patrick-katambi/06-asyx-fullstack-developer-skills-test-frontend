import {createSlice} from '@reduxjs/toolkit'

export const globalStateSlice = createSlice({
    name: 'global state',
    initialState: {accessToken: ""},
    reducers: {
        setAcessToken: (state, action) => {
            state.accessToken = action.payload
        }
    }
})

export const {setAcessToken} = globalStateSlice.actions

export const getAcessToken = (state) => state.global_state.accessToken

export default globalStateSlice.reducer
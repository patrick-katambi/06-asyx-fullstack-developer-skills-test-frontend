import {createSlice} from '@reduxjs/toolkit'

export const globalStateSlice = createSlice({
    name: 'global state',
    initialState: {accessToken: "", user_id: null},
    reducers: {
        setUserAcess: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.user_id = action.payload.user_id
        }
    }
})

export const {setUserAcess} = globalStateSlice.actions

export const getAcessToken = (state) => state.global_state.accessToken

export const getUserId = (state) => state.global_state.user_id

export default globalStateSlice.reducer
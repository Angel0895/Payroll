/**
 * Slice that has reducer and action for users information
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../models/models';

const initialState: UserData = {
    UserId: '',
    Password: '',
    FullName: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.UserId = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.Password = action.payload
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.FullName = action.payload
        }
    }
})

export const { setUserId, setPassword, setFullName } = userSlice.actions;

export default userSlice.reducer;
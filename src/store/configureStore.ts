import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

/**
 * Redux store for the app
 */
export const store = configureStore({
    reducer: {
        users: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
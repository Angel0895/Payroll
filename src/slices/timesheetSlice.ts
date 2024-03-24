/**
 * Slice that has reducer and action for timesheet information
 */

/*import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TimesheetData } from '../models/models';

const initialState: TimesheetData = {
    Id: 0, 
    UserId: '',
    Date: 0,
    HoursWorked: 0.0,
    TaskInfo: "",
    Comment: ""
};

export const timesheetSlice = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<number>) => {
            state.Date = action.payload
        },
        setHoursWorked: (state, action: PayloadAction<number>) => {
            state.HoursWorked = action.payload
        },
        setTaskInfo: (state, action: PayloadAction<string>) => {
            state.TaskInfo = action.payload
        },
        setComment: (state, action: PayloadAction<string>) => {
            state.Comment = action.payload
        }
    }
})

export const { setDate, setHoursWorked, setTaskInfo, setComment } = timesheetSlice.actions;

export default timesheetSlice.reducer;*/
// Performer Leaderboard Slicer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { getData } from "./dashboardApi";

const initialState = {
    dashboard: [],
    isLoading: false,
    isError: false,
    error: null
}
export const getDashboardData = createAsyncThunk("dashboard/getDashboardData", async () => {
    const data = await getData();
    return data;
});
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDashboardData.pending, (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardData.fulfilled,(state,action) => {
            state.isLoading = false;
            state.dashboard = action.payload;
        }).addCase(getDashboardData.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default dashboardSlice.reducer;
// Performer Leaderboard Slicer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { getData } from "./leaderboardApi";

const initialState = {
    leaderboards: [],
    isLoading: false,
    isError: false,
    error: null
}
export const getLeaderboards = createAsyncThunk("leaderboards/getLeaderboards", async () => {
    const data = await getData();
    return data;
});
const leaderboardsSlice = createSlice({
    name: 'leaderboards',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLeaderboards.pending, (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getLeaderboards.fulfilled,(state,action) => {
            state.isLoading = false;
            state.leaderboards = action.payload;
        }).addCase(getLeaderboards.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default leaderboardsSlice.reducer;
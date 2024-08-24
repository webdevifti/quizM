// Fetch the user/performers data and delete  - Slicer by admin
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { getPerformers,removePerformer } from "./performerApi";
const initialState = {
    performers: [],
    isLoading: false,
    isError: false,
    error: null
}
export const fetchPerformers = createAsyncThunk("performers/fetchPerformers", async () => {
    const data = await getPerformers();
    
    return data;
});
export const deletePerformer = createAsyncThunk("performers/deletePerformer", async (id) => {
    const data = await removePerformer(id);
    return data;
});

const performerSlice = createSlice({
    name: 'performers',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPerformers.pending, (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(fetchPerformers.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.performers = action.payload;
        }).addCase(fetchPerformers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }).addCase(deletePerformer.pending, (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(deletePerformer.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.performers = state.performers.filter(perfomer => perfomer.id !== action.meta.arg);
        }).addCase(deletePerformer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})
export default performerSlice.reducer
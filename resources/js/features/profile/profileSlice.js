import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { getData } from "./profileApi";

const initialState = {
    profile: [],
    isLoading: false,
    isError: false,
    error: null
}
export const getProfileData = createAsyncThunk("profile/getProfileData", async (user_id) => {
    const data = await getData(user_id);
    return data;
});


const ProfileSlicer = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProfileData.pending,(state,action) => { 
            state.isError = false;
            state.isLoading = true;
            state.error = action.payload
        }).addCase(getProfileData.fulfilled,(state,action) => {
            state.isLoading = false;
            state.profile = action.payload;
        }).addCase(getProfileData.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default ProfileSlicer.reducer
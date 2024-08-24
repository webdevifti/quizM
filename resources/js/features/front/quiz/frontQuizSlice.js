// Performer Quiz Slicer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { getData, quiz,submitQuiz } from "./frontQuizAPi";

const initialState = {
    quizes: [],
    isLoading: false,
    isError: false,
    error: null,
}

export const getQuizes = createAsyncThunk("frontQuizes/getQuizes", async (user_id) => {
    const data = await getData(user_id);
    return data;
});

export const getQuiz = createAsyncThunk("frontQuizes/getQuize", async ({id,userID}) => {
    const data = await quiz({id,userID});
    return data;
});

export const quizSubmit = createAsyncThunk("frontQuizes/quizSubmit", async ({formData,userID}) => {
    const data = await submitQuiz({formData,userID});
    return data;
});

const frontQuizesSlice = createSlice({
    name: 'frontQuizes',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getQuizes.pending,(state,action) => { 
            state.isError = false;
            state.isLoading = true;
        }).addCase(getQuizes.fulfilled,(state,action) => {
            state.isLoading = false;
            state.quizes = action.payload;
        }).addCase(getQuizes.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }).addCase(getQuiz.pending,(state,action) => { 
            state.isError = false;
            state.isLoading = true;
            
        }).addCase(getQuiz.fulfilled,(state,action) => {
            state.isLoading = false;
            state.quizes = action.payload;
        }).addCase(getQuiz.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }).addCase(quizSubmit.pending,(state,action) => { 
            state.isError = false;
            state.isLoading = true;
        }).addCase(quizSubmit.fulfilled,(state,action) => {
            state.isLoading = false;
            state.quizes = action.payload;
        }).addCase(quizSubmit.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})
export default frontQuizesSlice.reducer;
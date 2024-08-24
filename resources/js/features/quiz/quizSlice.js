// Crud Quiz by admin Slicer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteQuize, getQuizes, postQuiz,singleQuiz,getEditedQuiz, getUpdateQuiz,getQuizAnalyz } from "./quizApi";
const initialState = {
    quizes: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const fetchQuizes = createAsyncThunk("quizes/fetchQuizes", async () => {
    const data = await getQuizes();
    
    return data;
});
export const storeQuiz = createAsyncThunk(
    "quizes/storeQuiz",
    async (formData, { rejectWithValue }) => {
        try {
            const data = await postQuiz(formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteQuiz = createAsyncThunk(
    "quizes/deleteQuiz",
    async (id, { rejectWithValue }) => {
        try {
            const data = await deleteQuize(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const showQuiz = createAsyncThunk(
    "quizes/showQuiz",
    async (id, { rejectWithValue }) => {
        try {
            const data = await singleQuiz(id);
         
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const editQuiz = createAsyncThunk(
    "quizes/editQuiz",
    async (id, { rejectWithValue }) => {
        try {
            const data = await getEditedQuiz(id);
         
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const updateQuiz = createAsyncThunk(
    "quizes/updateQuiz",
    async ({formData,id}, { rejectWithValue }) => {
        try {
            const data = await getUpdateQuiz(formData,id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const analyzQuiz = createAsyncThunk(
    "quizes/analyzQuiz",
    async (id, { rejectWithValue }) => {
        try {
            const data = await getQuizAnalyz(id);
         
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const quizesSlice = createSlice({
    name: "quizes",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizes.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchQuizes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(fetchQuizes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(storeQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(storeQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(storeQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(showQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(showQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(showQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(editQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(editQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(editQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(updateQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(deleteQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = state.quizes.filter(quiz => quiz.id !== action.meta.arg);
            })
            .addCase(deleteQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(analyzQuiz.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(analyzQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizes = action.payload;
            })
            .addCase(analyzQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});
export default quizesSlice.reducer;

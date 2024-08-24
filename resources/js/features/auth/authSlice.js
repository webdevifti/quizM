// Performer and Admin Auth Slicer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: sessionStorage.getItem('token') || null,
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        },
       
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
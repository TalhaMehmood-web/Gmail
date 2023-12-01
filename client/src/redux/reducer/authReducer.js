// authReducer.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthorized: false,
        error: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isAuthorized = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthorized = false;
            state.error = null;
        },
        loginError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { loginUser, logout, loginError } = authSlice.actions;
export default authSlice.reducer;

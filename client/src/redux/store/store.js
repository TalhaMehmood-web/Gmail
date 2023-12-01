// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authReducer";
import emailReducer from "../reducer/emailReducer";
const store = configureStore({
    reducer: {
        auth: authReducer,
        email: emailReducer
        // Add other reducers here if needed
    },
});

export default store;

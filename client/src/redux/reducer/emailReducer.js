
import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: "email",
    initialState: {
        email: [],

    },
    reducers: {
        allMails: (state, action) => {
            state.email = action.payload;

        },
    },
});

export const { allMails } = emailSlice.actions;
export default emailSlice.reducer;

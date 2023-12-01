
import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: "email",
    initialState: {
        emails: [],

    },
    reducers: {
        allMails: (state, action) => {
            state.emails = action.payload;

        },
    },
});

export const { allMails } = emailSlice.actions;
export default emailSlice.reducer;

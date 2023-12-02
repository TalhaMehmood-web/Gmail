
import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: "email",
    initialState: {
        emails: null,
        starredRows: [],
    },
    reducers: {
        allMails: (state, action) => {
            state.emails = action.payload;

        },
        updateStarredRows: (state, action) => {
            const id = action.payload;
            if (state.starredRows.includes(id)) {
                state.starredRows = state.starredRows.filter((rowId) => rowId !== id);
            } else {
                state.starredRows.push(id);
            }
        },
    },
});

export const { allMails, updateStarredRows } = emailSlice.actions;
export default emailSlice.reducer;

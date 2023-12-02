// authActions.js
import { createAction } from "@reduxjs/toolkit";

export const loginSuccess = createAction("auth/loginUser");
export const logoutSuccess = createAction("auth/logoutUser");
export const loginError = createAction("auth/loginError");

//email
export const getMails = createAction("email/allMails");
export const updateStarredRows = createAction("email/updateStarredRows");
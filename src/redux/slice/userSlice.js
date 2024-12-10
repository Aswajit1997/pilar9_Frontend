import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload || {};
			ls.set("user", payload);
		},
		fetchUserFromLocal: (state, { payload }) => {
			state.user = ls.get("user") || {};
		},
	},
});

export const { setUser, fetchUserFromLocal } = userSlice.actions;

export default userSlice.reducer;

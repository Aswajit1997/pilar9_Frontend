import { configureStore } from "@reduxjs/toolkit";
import tempSlice from "./slice/tempSlice";
import widgetSlice from "./slice/widgetSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
	reducer: {
		temp: tempSlice,
		widget: widgetSlice,
		user: userSlice,
	},
});

export default store;

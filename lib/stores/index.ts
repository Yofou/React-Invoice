import { configureStore } from "@reduxjs/toolkit";
import { filterByStatus } from "./filter-by-status";
import { invoices } from "./invoices";
import lightTheme from "./lightTheme";

export const store = configureStore({
	reducer: {
		filterByStatus: filterByStatus.reducer,
		invoices: invoices.reducer,
		isLightTheme: lightTheme.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

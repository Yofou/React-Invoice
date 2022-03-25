import { configureStore } from "@reduxjs/toolkit"
import { example } from "./example"
import { filterByStatus } from "./filter-by-status"

export const store = configureStore({
	reducer: {
		counter: example.reducer,
		filterByStatus: filterByStatus.reducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

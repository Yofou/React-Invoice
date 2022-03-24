import { configureStore } from "@reduxjs/toolkit"
import { example } from "./example"

export const store = configureStore({
	reducer: {
		counter: example.reducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

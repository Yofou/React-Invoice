import { createSlice } from "@reduxjs/toolkit";

export const example = createSlice({
	name: "counter",
	initialState: 0,
	reducers: {
		inc: (state) => {
			return state + 1
		},
		dec: (state) => {
			return state - 1
		}
	}
})

export const { inc, dec } = example.actions

import { createSlice } from "@reduxjs/toolkit";
import type { Invoice } from "./invoices-types"

export const invoices = createSlice({
	name: "invoices",
	initialState: [] as Invoice[],
	reducers: {
		clear: () => {
			return []
		}
	}
})


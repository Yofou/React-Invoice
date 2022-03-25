import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum InvoiceStatus {
	DRAFT,
	PENDING,
	PAID
}

export const filterByStatus = createSlice({
	name: "filterByStatus",
	initialState: [] as InvoiceStatus[],
	reducers: {
		addOrRemoveFilter: (state, action: PayloadAction<InvoiceStatus>) => {
			if ( state.includes( action.payload ) ) {
				state = state.filter( item => item !== action.payload )
			} else {
				state.push( action.payload )
			}

			return state
		}
	}
})

export const { addOrRemoveFilter } = filterByStatus.actions

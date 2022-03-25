import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentStatus } from "./invoices-types";

export const filterByStatus = createSlice({
	name: "filterByStatus",
	initialState: [] as PaymentStatus[],
	reducers: {
		addOrRemoveFilter: (state, action: PayloadAction<PaymentStatus>) => {
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

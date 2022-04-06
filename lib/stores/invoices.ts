import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice, PaymentStatus } from "./invoices-types";

export const invoices = createSlice({
	name: "invoices",
	initialState: () => {
		return [] as Invoice[];
	},
	reducers: {
		replace: (_, action: PayloadAction<Invoice[]>) => action.payload,
		deleteByID: (state, action: PayloadAction<string>) => {
			const newState = state.filter((invoice) => {
				return invoice.id !== action.payload;
			});

			localStorage.setItem("invoices", JSON.stringify(newState));
			return newState;
		},
		markAsPaid: (state, action: PayloadAction<string>) => {
			const newState = state.map((invoice) => {
				if (invoice.id === action.payload)
					return { ...invoice, paymentStatus: PaymentStatus.Paid };
				return invoice;
			});

			localStorage.setItem("invoices", JSON.stringify(newState));
			return newState;
		},
		addOrUpdateInvoice: (state, action: PayloadAction<Invoice>) => {
			const isFound = state.find((invoice) => invoice.id === action.payload.id);
			if (isFound) {
				const newState = state.map((invoice) => {
					if (invoice.id === action.payload.id) return action.payload;
					return invoice;
				});

				localStorage.setItem("invoices", JSON.stringify(newState));
				return newState;
			}

			state.push(action.payload);
			localStorage.setItem("invoices", JSON.stringify(state));
			return state;
		},
	},
});

export const { deleteByID, markAsPaid, addOrUpdateInvoice, replace } = invoices.actions;

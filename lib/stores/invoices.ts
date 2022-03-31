import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice, PaymentStatus, PaymentTerms } from "./invoices-types"

const data: Invoice[] = [
	{
		id: "RT3080",
		billFrom: {
			address: "19 Union Terrace",
			city: "London",
			postCode: "E1 3EZ",
			country: "United Kingdom",
		},
		billTo: {
			name: "Alex Grim",
			email: "alexgrim@mail.com",
			address: "84 Church Way",
			city: "Bradford",
			postCode: "BD1 9PB",
			country: "United Kingdom",
		},
		invoiceDate: (new Date(2021, 7, 19)).getTime(),
		paymentTerms: PaymentTerms.ThirtyDays,
		paymentStatus: PaymentStatus.Pending,
		projectDescription: "Graphic Design",
		items: [
			{
				name: "Banner Design",
				qty: 1,
				price: 156,
			},
			{
				name: "Email Design",
				qty: 2,
				price: 200,
			},
		],
	},
	{
		id: "AA1449",
		billFrom: {
			address: "19 Union Terrace",
			city: "London",
			postCode: "E1 3EZ",
			country: "United Kingdom",
		},
		billTo: {
			name: "Alex Grim",
			email: "alexgrim@mail.com",
			address: "84 Church Way",
			city: "Bradford",
			postCode: "BD1 9PB",
			country: "United Kingdom",
		},
		invoiceDate: (new Date(2021, 7, 19)).getTime(),
		paymentTerms: PaymentTerms.ThirtyDays,
		paymentStatus: PaymentStatus.Paid,
		projectDescription: "Graphic Design",
		items: [
			{
				name: "Banner Design",
				qty: 1,
				price: 156,
			},
			{
				name: "Banner Design",
				qty: 2,
				price: 200,
			},
		],
	},
	{
		id: "XM9141",
		billFrom: {
			address: "19 Union Terrace",
			city: "London",
			postCode: "E1 3EZ",
			country: "United Kingdom",
		},
		billTo: {
			name: "Alex Grim",
			email: "alexgrim@mail.com",
			address: "84 Church Way",
			city: "Bradford",
			postCode: "BD1 9PB",
			country: "United Kingdom",
		},
		invoiceDate: (new Date(2021, 7, 19)).getTime(),
		paymentTerms: PaymentTerms.ThirtyDays,
		paymentStatus: PaymentStatus.Draft,
		projectDescription: "Graphic Design",
		items: [
			{
				name: "Banner Design",
				qty: 1,
				price: 156,
			},
			{
				name: "Banner Design",
				qty: 2,
				price: 200,
			},
		],
	},
]

export const invoices = createSlice({
	name: "invoices",
	initialState: data as Invoice[],
	reducers: {
		deleteByID: (state, action: PayloadAction<string>) => {
			return state.filter(invoice => {
				return invoice.id !== action.payload
			})
		},
		markAsPaid: (state, action: PayloadAction<string>) => {
			return state.map(invoice => {
				if (invoice.id === action.payload) return { ...invoice, paymentStatus: PaymentStatus.Paid }
				return invoice
			})
		},
		updateInvoice: (state, action: PayloadAction<Invoice>) => {
			return state.map(invoice => {
				if ( invoice.id === action.payload.id ) return action.payload
				return invoice
			})
		}
	}
})

export const { deleteByID, markAsPaid, updateInvoice } = invoices.actions

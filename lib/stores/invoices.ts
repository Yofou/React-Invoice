import { createSlice } from "@reduxjs/toolkit";
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
		invoiceData: new Date(2021, 7, 19),
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
				name: "Banner Design",
				qty: 2,
				price: 200,
			},
		],
	},
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
		invoiceData: new Date(2021, 7, 19),
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
		invoiceData: new Date(2021, 7, 19),
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
	initialState: data,
	reducers: {
		clear: () => {
			return []
		}
	}
})


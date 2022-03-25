interface BillInfo {
	address: string,
	city: string,
	postCode: string,
	country: string
}

export enum PaymentTerms {
	OneDay = 1,
	SevenDays = 7,
	ForteenDays = 14,
	ThirtyDays = 30,
}

export interface Item {
	name: string,
	qty: number,
	price: number,
}

export interface Invoice {
	id: string,
	billFrom: BillInfo,
	billTo: BillInfo & { name: string, email: string }
	invoiceData: Date,
	paymentTerms: PaymentTerms,
	projectDescription: string,
	items: Item[]
}

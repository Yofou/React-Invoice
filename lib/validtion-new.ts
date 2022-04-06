import * as yup from "yup";

const requiredMessage = "can't be empty";
export const schema = yup.object({
	billFrom: yup
		.object({
			address: yup.string(),
			city: yup.string(),
			postCode: yup.string(),
			country: yup.string(),
		})
		.required(requiredMessage),
	billTo: yup.object({
		name: yup.string(),
		email: yup.string(),
		address: yup.string(),
		city: yup.string(),
		postCode: yup.string(),
		country: yup.string(),
	}),
	invoiceDate: yup.number(),
	paymentTerms: yup.number(),
	projectDescription: yup.string(),
	items: yup.array().of(
		yup.object({
			name: yup.string(),
			qty: yup.number(),
			price: yup.number(),
		})
	),
});

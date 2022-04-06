import * as yup from "yup";

const requiredMessage = "can't be empty";
export const schema = yup.object({
	billFrom: yup
		.object({
			address: yup.string().required(requiredMessage),
			city: yup.string().required(requiredMessage),
			postCode: yup.string().required(requiredMessage),
			country: yup.string().required(requiredMessage),
		})
		.required(requiredMessage),
	billTo: yup
		.object({
			name: yup.string().required(requiredMessage),
			email: yup.string().required(requiredMessage),
			address: yup.string().required(requiredMessage),
			city: yup.string().required(requiredMessage),
			postCode: yup.string().required(requiredMessage),
			country: yup.string().required(requiredMessage),
		})
		.required(requiredMessage),
	invoiceDate: yup.number().required(requiredMessage),
	paymentTerms: yup.number().required(requiredMessage),
	projectDescription: yup.string().required(requiredMessage),
	items: yup.array().of(
		yup
			.object({
				name: yup.string().required(requiredMessage),
				qty: yup.number().required(requiredMessage),
				price: yup.number().required(requiredMessage),
			})
			.required(requiredMessage)
	),
});

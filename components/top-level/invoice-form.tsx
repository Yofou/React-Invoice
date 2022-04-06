import InvoiceItemList from "@components/invoices/invoice-item-list";
import InvoiceLabelInput from "@components/top-level/invoice-label-input";
import {
	Invoice,
	PaymentStatus,
	PaymentTerms,
} from "@lib/stores/invoices-types";
import { FormEventHandler, forwardRef, useEffect } from "react";
import Button from "./button";
import InvoiceLabelCalender from "./invoice-label-calender";
import InvoiceLabelDropDown from "./invoice-label-dropdown";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { yupResolver } from "@hookform/resolvers/yup";
import ShortUniqueId from "short-unique-id";

type InvocieFormProps = React.PropsWithChildren<{
	onFormSubmit: SubmitHandler<Invoice>;
	invoice?: Invoice;
	resolver: any;
}>;
const InvoiceForm = forwardRef<HTMLFormElement, InvocieFormProps>(
	({ invoice, onFormSubmit, resolver }, formRef) => {
		const termOptions = [
			PaymentTerms.OneDay,
			PaymentTerms.SevenDays,
			PaymentTerms.ForteenDays,
			PaymentTerms.ThirtyDays,
		];
		const {
			handleSubmit,
			register,
			watch,
			setValue,
			control,
			formState: { errors },
			getFieldState,
		} = useForm<Invoice>({
			resolver: yupResolver(resolver),
			defaultValues: {
				id: invoice?.id ?? new ShortUniqueId({ length: 6 })(),
				invoiceDate: invoice?.invoiceDate ?? DateTime.now().toMillis(),
				paymentTerms: invoice?.paymentTerms ?? termOptions[0],
				items: [{ name: "", qty: 1, price: 0 }],
				paymentStatus: invoice?.paymentStatus ?? PaymentStatus.Draft,
			},
		});

		const {
			fields: items,
			append,
			replace,
			remove,
		} = useFieldArray({ control, name: "items" });
		const itemsWatch = watch("items");
		const onAddItem = () => append({ name: "", qty: 1, price: 0 });
		const [paymentTerms, setPaymentTerms] = [
			watch("paymentTerms"),
			(value: PaymentTerms) => setValue("paymentTerms", value),
		];
		const [issueDate, setIssueDate] = [
			watch("invoiceDate"),
			(value: number) => setValue("invoiceDate", value),
		];

		useEffect(() => {
			const itemsCopy = JSON.parse(
				JSON.stringify(invoice?.items ?? [{ name: "", qty: 1, price: 0 }])
			);
			replace(itemsCopy);
		}, [invoice?.items, replace]);

		const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
			event.preventDefault();
			handleSubmit(onFormSubmit, console.log)(event);
		};

		return (
			<form
				ref={formRef}
				onSubmit={onSubmit}
				className="-z-10 grid grid-rows-[repeat(2,max-content)] py-[30px] pr-[10px] scrollbar scrollbar-thumb-grey-1200 scrollbar-track-black-300 md:overflow-y-scroll"
			>
				<fieldset className="grid grid-flow-row grid-cols-2 gap-6 md:grid-cols-3">
					<h2 className="w-full text-purple-600 text-h4">Bill from</h2>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1]"
						register={register("billFrom.address")}
						getFieldState={getFieldState}
						errors={errors}
						defaultValue={invoice?.billFrom?.address}
					>
						Street Address
					</InvoiceLabelInput>
					<InvoiceLabelInput
						register={register("billFrom.city")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billFrom?.city}
					>
						City
					</InvoiceLabelInput>
					<InvoiceLabelInput
						register={register("billFrom.postCode")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billFrom?.postCode}
					>
						Post Code
					</InvoiceLabelInput>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1] md:col-auto"
						register={register("billFrom.country")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billFrom?.country}
					>
						Country
					</InvoiceLabelInput>
				</fieldset>

				<fieldset className="mt-12 grid w-full grid-flow-row grid-cols-2 gap-6 md:grid-cols-3">
					<h2 className="w-full text-purple-600 text-h4">Bill to</h2>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1]"
						register={register("billTo.name")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billTo.name}
					>
						Clients Name
					</InvoiceLabelInput>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1]"
						register={register("billTo.email")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billTo.email}
					>
						Clients Email
					</InvoiceLabelInput>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1]"
						register={register("billTo.address")}
						errors={errors}
						getFieldState={getFieldState}
						defaultValue={invoice?.billTo.address}
					>
						Street address
					</InvoiceLabelInput>
					<InvoiceLabelInput
						register={register("billTo.city")}
						errors={errors}
						defaultValue={invoice?.billTo.city}
						getFieldState={getFieldState}
					>
						City
					</InvoiceLabelInput>
					<InvoiceLabelInput
						register={register("billTo.postCode")}
						errors={errors}
						defaultValue={invoice?.billTo.postCode}
						getFieldState={getFieldState}
					>
						Post Code
					</InvoiceLabelInput>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1] md:col-auto"
						errors={errors}
						register={register("billTo.country")}
						defaultValue={invoice?.billTo.country}
						getFieldState={getFieldState}
					>
						Country
					</InvoiceLabelInput>
				</fieldset>

				<fieldset className="mt-12 grid w-full grid-flow-row grid-cols-2 gap-6">
					<InvoiceLabelCalender
						className="col-start-1 col-end-[-1] md:col-auto"
						selected={issueDate}
						setSelected={setIssueDate}
					>
						Issue Date
					</InvoiceLabelCalender>
					<InvoiceLabelDropDown
						selected={paymentTerms}
						options={termOptions}
						onOptionSelect={setPaymentTerms}
						optionDisplay={(value) => `Net ${value} Days`}
						className="col-start-1 col-end-[-1] md:col-auto"
					>
						Payment Term
					</InvoiceLabelDropDown>
					<InvoiceLabelInput
						className="col-start-1 col-end-[-1]"
						register={register("projectDescription")}
						errors={errors}
						defaultValue={invoice?.projectDescription}
						getFieldState={getFieldState}
					>
						Project Description
					</InvoiceLabelInput>
				</fieldset>

				<fieldset className="mt-8 w-full">
					<h1 className="mb-4 text-[18px] font-bold leading-[32px] tracking-[-0.38px] text-[#777F98]">
						Item List
					</h1>
					<InvoiceItemList
						register={register}
						items={items}
						itemsWatch={itemsWatch}
						errors={errors}
						removeItem={remove}
					/>
					<Button
						onClick={onAddItem}
						className="mt-12 w-full bg-grey-1200 text-grey-300 text-h4 md:mt-4"
					>
						+ Add New Item
					</Button>
				</fieldset>
			</form>
		);
	}
);

InvoiceForm.displayName = "InvoiceForm";
export default InvoiceForm;

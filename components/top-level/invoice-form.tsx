import InvoiceItemList from "@components/invoices/invoice-item-list"
import InvoiceLabelInput from "@components/top-level/invoice-label-input"
import { Invoice, PaymentStatus, PaymentTerms } from "@lib/stores/invoices-types"
import { FormEventHandler, forwardRef, useEffect } from "react"
import Button from "./button"
import InvoiceLabelCalender from "./invoice-label-calender"
import InvoiceLabelDropDown from "./invoice-label-dropdown"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { DateTime } from "luxon"
import { yupResolver } from "@hookform/resolvers/yup"
import ShortUniqueId from "short-unique-id"
import { schema } from "@lib/validation"

type InvocieFormProps = React.PropsWithChildren<{ onFormSubmit: SubmitHandler<Invoice>, invoice?: Invoice, }>
const InvoiceForm = forwardRef<HTMLFormElement, InvocieFormProps>(({ invoice, onFormSubmit }, formRef) => {
	const termOptions = [ PaymentTerms.OneDay, PaymentTerms.SevenDays, PaymentTerms.ForteenDays, PaymentTerms.ThirtyDays ]
	const { handleSubmit, register, watch, setValue, control, formState: { errors }, getFieldState } = useForm<Invoice>({
		resolver: yupResolver( schema ),
		defaultValues: { 
			id: invoice?.id ?? (new ShortUniqueId({ length: 6 }))(),
			invoiceDate: invoice?.invoiceDate ?? DateTime.now().toMillis(),
			paymentTerms: invoice?.paymentTerms ?? termOptions[0], 
			items: [{ name: "", qty: 1, price: 0 }],
			paymentStatus: invoice?.paymentStatus ?? PaymentStatus.Draft
		}
	})

	const { fields: items, append, replace, remove } = useFieldArray({ control, name: "items" })
	const itemsWatch = watch("items")
	const onAddItem = () => append({ name: "", qty: 1, price: 0 })
	const [paymentTerms, setPaymentTerms] = [ watch("paymentTerms"), (value: PaymentTerms) => setValue("paymentTerms", value) ]
	const [issueDate, setIssueDate] = [ watch("invoiceDate"), (value: number) => setValue("invoiceDate", value) ]

	useEffect(() => {
		const itemsCopy = JSON.parse( JSON.stringify( invoice?.items ?? [ { name: "", qty: 1, price: 0 } ] ) )
		replace( itemsCopy )
	}, [invoice?.items, replace])

	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		handleSubmit( onFormSubmit, console.log )(event)
	}

	return <form 
		ref={formRef} 
		onSubmit={onSubmit} 
		className="grid grid-rows-[repeat(2,max-content)] md:overflow-y-scroll scrollbar scrollbar-track-black-300 scrollbar-thumb-grey-1200 py-[30px] pr-[10px] -z-10"
	>
		<fieldset className="grid grid-cols-2 md:grid-cols-3 gap-6 grid-flow-row">
			<h2 className="text-purple-600 text-h4 w-full">Bill from</h2>
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

		<fieldset className="w-full grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-6 mt-12">
			<h2 className="text-purple-600 text-h4 w-full">Bill to</h2>
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
			>
				Post Code
			</InvoiceLabelInput>
			<InvoiceLabelInput 
				className="col-start-1 col-end-[-1] md:col-auto" 
				errors={errors} 
				register={register("billTo.country")} 
				defaultValue={invoice?.billTo.country}
			>
				Country
			</InvoiceLabelInput>
		</fieldset>
		
		<fieldset className="w-full grid grid-cols-2 grid-flow-row gap-6 mt-12">
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
				optionDisplay={value => `Net ${value} Days`}
				className="col-start-1 col-end-[-1] md:col-auto"
			>
				Payment Term
			</InvoiceLabelDropDown>
			<InvoiceLabelInput 
				className="col-start-1 col-end-[-1]" 
				register={register("projectDescription")} 
				errors={errors} 
				defaultValue={invoice?.projectDescription}
			>
				Project Description
			</InvoiceLabelInput>
		</fieldset>

		<fieldset className="w-full mt-8">
			<h1 className="text-[18px] leading-[32px] tracking-[-0.38px] font-bold text-[#777F98] mb-4">Item List</h1>
			<InvoiceItemList 
				register={register} 
				items={items} 
				itemsWatch={itemsWatch} 
				errors={errors} 
				removeItem={remove} 
			/>
			<Button onClick={onAddItem} className="w-full mt-12 md:mt-4 bg-grey-1200 text-grey-300 text-h4">+ Add New Item</Button>
		</fieldset>
	</form> 
})

InvoiceForm.displayName = "InvoiceForm"
export default InvoiceForm

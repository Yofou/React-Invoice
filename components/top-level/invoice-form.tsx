import InvoiceItemList from "@components/invoices/invoice-item-list"
import InvoiceLabelInput from "@components/top-level/invoice-label-input"
import { Invoice, Item, PaymentTerms } from "@lib/stores/invoices-types"
import { DateTime } from "luxon"
import { FormEventHandler, useEffect, useState } from "react"
import Button from "./button"
import InvoiceLabelCalender from "./invoice-label-calender"
import InvoiceLabelDropDown from "./invoice-label-dropdown"

type InvocieFormProps = { onSubmit?: FormEventHandler<HTMLFormElement>, invoice?: Invoice }
const InvoiceForm: React.FC<InvocieFormProps> = ({ onSubmit, invoice }) => {
	const [fromAddress, setFromAddress] = useState( invoice?.billFrom.address ?? "" )
	const [fromCity, setFromCity] = useState( invoice?.billFrom.city ?? "" )
	const [fromPostCode, setFromPostCode] = useState( invoice?.billFrom.postCode ?? "" )
	const [fromCountry, setFromCountry] = useState( invoice?.billFrom.country ?? "" )
	const [toClientName, setToClientName] = useState( invoice?.billTo.name ?? "" )
	const [toClientEmail, setToClientEmail] = useState( invoice?.billTo.email ?? "" )
	const [toAddress, setToAddress] = useState( invoice?.billTo.address ?? "" )
	const [toCity, setToCity] = useState( invoice?.billTo.city ?? "" )
	const [toPostCode, setToPostCode] = useState( invoice?.billTo.postCode ?? "" )
	const [toCountry, setToCountry] = useState( invoice?.billTo?.country ?? "" )
	const [items, setItem] = useState<Item[]>( [{ name: "", qty: 1, price: 0 }]  )
	const onAddItem = () => setItem([...items, { name: "", qty: 1, price: 0 }])
	const termOptions = [PaymentTerms.OneDay, PaymentTerms.SevenDays, PaymentTerms.ForteenDays, PaymentTerms.ThirtyDays]
	const [paymentTerms, setPaymentTerms] = useState(invoice?.paymentTerms ?? termOptions[0] ) 
	const [projectDescription, setProjectDescription] = useState( invoice?.projectDescription ?? "" )
	const [issueDate, setIssueDate] = useState( DateTime.fromMillis( invoice?.invoiceDate ?? DateTime.now().toMillis() ))

	useEffect(() => {
		const itemsCopy = JSON.parse( JSON.stringify( invoice?.items ?? [ { name: "", qty: 1, price: 0 } ] ) )
		setItem( itemsCopy )
	}, [invoice?.items])

	return <form onSubmit={onSubmit} className="grid grid-rows-[repeat(2,max-content)] overflow-y-scroll scrollbar scrollbar-track-black-300 scrollbar-thumb-grey-1200 py-[30px] pr-[10px] -z-10">
		<fieldset className="grid grid-cols-3 gap-6 grid-flow-row">
			<h2 className="text-purple-600 text-h4 w-full">Bill from</h2>
			<InvoiceLabelInput className="col-start-1 col-end-[-1]" value={fromAddress} onValueChange={setFromAddress}>Street Address</InvoiceLabelInput>
			<InvoiceLabelInput value={fromCity} onValueChange={setFromCity}>City</InvoiceLabelInput>
			<InvoiceLabelInput value={fromPostCode} onValueChange={setFromPostCode}>Post Code</InvoiceLabelInput>
			<InvoiceLabelInput value={fromCountry} onValueChange={setFromCountry}>Country</InvoiceLabelInput>
		</fieldset>

		<fieldset className="w-full grid grid-cols-3 grid-flow-row gap-6 mt-12">
			<h2 className="text-purple-600 text-h4 w-full">Bill to</h2>
			<InvoiceLabelInput className="col-start-1 col-end-[-1]" value={toClientName} onValueChange={setToClientName}>Clients Name</InvoiceLabelInput>
			<InvoiceLabelInput className="col-start-1 col-end-[-1]" value={toClientEmail} onValueChange={setToClientEmail}>Clients Email</InvoiceLabelInput>
			<InvoiceLabelInput className="col-start-1 col-end-[-1]" value={toAddress} onValueChange={setToAddress}>Street address</InvoiceLabelInput>
			<InvoiceLabelInput value={toCity} onValueChange={setToCity}>City</InvoiceLabelInput>
			<InvoiceLabelInput value={toPostCode} onValueChange={setToPostCode}>Post Code</InvoiceLabelInput>
			<InvoiceLabelInput value={toCountry} onValueChange={setToCountry}>Country</InvoiceLabelInput>
		</fieldset>
		
		<fieldset className="w-full grid grid-cols-2 grid-flow-row gap-6 mt-12">
			<InvoiceLabelCalender selected={issueDate} setSelected={setIssueDate} >Issue Date</InvoiceLabelCalender>
			<InvoiceLabelDropDown 
				selected={paymentTerms}
				options={termOptions} 
				onOptionSelect={setPaymentTerms}
				optionDisplay={value => `Net ${value} Days`}
			>
				Payment Term
			</InvoiceLabelDropDown>
			<InvoiceLabelInput className="col-start-1 col-end-[-1]" value={projectDescription} onValueChange={setProjectDescription}>Project Description</InvoiceLabelInput>
		</fieldset>

		<fieldset className="w-full mt-8">
			<h1 className="text-[18px] leading-[32px] tracking-[-0.38px] font-bold text-[#777F98] mb-4">Item List</h1>
			<InvoiceItemList items={items} setItem={setItem} />
			<Button onClick={onAddItem} className="w-full mt-4 bg-grey-1200 text-grey-300 text-h4">+ Add New Item</Button>
		</fieldset>
	</form> 
}

export default InvoiceForm

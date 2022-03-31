import { DateTime, Duration } from "luxon"
import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"
import InvoiceViewAmount from "./invoice-view-amount"
import InvoiceViewItem from "./invoice-view-item"
import InvoiceViewTable from "./invoice-view-table"

const InvoiceView: React.FC = () => {
	const invoice = useContext(InvoiceContext)
	if (!invoice) return <></>
	const invoiceDate = DateTime.fromMillis(invoice.invoiceDate)
	const readableInvoiceDate = invoiceDate.toFormat("d LLL yyyy")
	
	const duration = Duration.fromObject({ day: invoice.paymentTerms })
	const paymentDue = invoiceDate
		.plus( duration )
		.toFormat("d LLL yyyy")

	const totalAmount = invoice.items.reduce( (total, curr) => total + (curr.price * curr.qty), 0)

	return <section className="w-full p-8 md:p-12 bg-grey-1500 rounded-[8px] grid grid-cols-[minmax(0,max-content),1fr] sm:grid-cols-[repeat(2,minmax(0,max-content)),1fr] grid-rows-[repeat(7,max-content)] sm:grid-rows-[repeat(5,max-content)] gap-x-10 sm:gap-x-[100px]">
		<h1 className="hidden">invoice of #{invoice.id}</h1>

		<div className="flex flex-col sm:gap-2 row-start-1 row-end-2 col-start-1 col-end-[-1] sm:col-end-2 mb-[30px] sm:mb-0">
			<h1 className="text-h4 md:text-h3 uppercase text-white-full">
				<span className="text-grey-600">#</span>{invoice.id}
			</h1>
			<p className="text-body-1 text-grey-300">{invoice.projectDescription}</p>
		</div>

		<address className="sm:text-right mb-[30px] sm:mb-5 text-body-2 text-grey-300 not-italic sm:self-end col-start-1 col-end-[-1] sm:col-start-3 sm:col-end-4">
			{invoice.billFrom.address}<br />
			{invoice.billFrom.city}<br />
			{invoice.billFrom.postCode}<br />
			{invoice.billFrom.country}
		</address>

		<InvoiceViewItem title="Invoice Date">{readableInvoiceDate}</InvoiceViewItem>
		<InvoiceViewItem title="Bill to">{invoice.billTo.name}</InvoiceViewItem>
		<InvoiceViewItem className="row-start-5 row-end-6 sm:row-auto mt-8 sm:mt-0 sm:ml-[10px]" title="Sent to">{invoice.billTo.email}</InvoiceViewItem>
		<InvoiceViewItem className="self-end" title="Payment Due">{paymentDue}</InvoiceViewItem>
		
		<address className="text-body-2 not-italic text-grey-300 mt-2">
			{invoice.billTo.address}<br />
			{invoice.billTo.city}<br />
			{invoice.billTo.postCode}<br />
			{invoice.billTo.country}
		</address>

		<InvoiceViewTable className="col-start-1 col-end-[-1] mt-[45px]" />
		<InvoiceViewAmount className="col-start-1 col-end-[-1]" amount={totalAmount} />
	</section>
}

export default InvoiceView

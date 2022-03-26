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

	return <section className="w-full p-12 bg-grey-1500 rounded-[8px] grid grid-cols-[repeat(2,minmax(0,max-content)),1fr] grid-rows-[repeat(5,max-content)] gap-x-[100px]">
		<h1 className="hidden">invoice of #{invoice.id}</h1>

		<div className="flex flex-col gap-2 row-start-1 row-end-2 col-start-1 col-end-2">
			<h1 className="text-h3 uppercase text-white-full">
				<span className="text-grey-600">#</span>{invoice.id}
			</h1>
			<p className="text-body-1 text-grey-300">{invoice.projectDescription}</p>
		</div>

		<address className="text-right mb-5 text-body-2 text-grey-300 not-italic self-end col-start-3 col-end-4">
			19 Union Terrace<br />
			London<br />
			E1 3EZ<br />
			United Kingdom
		</address>

		<InvoiceViewItem title="Invoice Date">{readableInvoiceDate}</InvoiceViewItem>
		<InvoiceViewItem title="Bill to">{invoice.billTo.name}</InvoiceViewItem>
		<InvoiceViewItem className="ml-[10px] mb-2" title="Sent to">{invoice.billTo.email}</InvoiceViewItem>
		<InvoiceViewItem className="self-end" title="Payment Due">{paymentDue}</InvoiceViewItem>
		
		<address className="text-body-2 not-italic text-grey-300">
			84 Church Way<br />
			Bradford<br />
			BD1 9PB<br />
			United Kingdom
		</address>

		<InvoiceViewTable className="col-start-1 col-end-[-1] mt-[45px]" />
		<InvoiceViewAmount className="col-start-1 col-end-[-1]" amount={totalAmount} />
	</section>
}

export default InvoiceView

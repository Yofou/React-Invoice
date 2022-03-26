import { Invoice } from "@lib/stores/invoices-types"
import Image from "next/image"
import Link from "next/link"
import InvoiceStatus from "@components/top-level/invoice-status"
import { DateTime, Duration } from "luxon"

type InvoiceItemProps = { invoice: Invoice }
const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
	
	const invoiceDate = DateTime.fromMillis(invoice.invoiceDate)
	const duration = Duration.fromObject({ day: invoice.paymentTerms })

	const readableDate = invoiceDate.plus( duration ).toFormat("d LLL yyyy")
	const total = invoice.items.reduce((total, curr) => total + (curr.price * curr.qty), 0)
	const readableTotal = new Intl.NumberFormat("en-GB", { currency: "GBP", style: "currency" }).format( total )

	return <li className="bg-grey-1500 rounded-[8px] text-white-full text-body-1">
		<Link href={`/invoices/${invoice.id}`}>
			<a className="w-full grid sm:grid-cols-[repeat(3,minmax(0,max-content)),1fr,repeat(2,minmax(0,max-content))] grid-cols-[max-content,1fr] grid-rows-[repeat(3,max-content)] sm:grid-rows-1 sm:gap-[34px] sm:py-4 sm:pl-8 sm:pr-6 p-6 items-center">
				<h1 className="font-bold"><span className="text-grey-600">#</span>{invoice.id}</h1>
				<p className="mt-6 sm:mt-0">Due {readableDate}</p>
				<p className="row-start-1 row-end-2 col-start-2 col-end-3 sm:row-auto sm:col-auto justify-self-end sm:justify-self-start">{invoice.billTo.name}</p>
				<p className="text-h3 self-end sm:justify-self-end">{readableTotal}</p>
				<InvoiceStatus className="col-start-2 col-end-3 row-start-2 row-end-[-1] sm:row-auto sm:col-auto mb-1 sm:mb-0 justify-self-end self-end sm:justify-self-start" status={invoice.paymentStatus} />
				<div className="hidden md:block relative">
					<Image src="/icon-arrow-right.svg" alt="" layout="fixed" width="7px" height="10px"  />
				</div>
			</a>
		</Link>
		
	</li>
}

export default InvoiceItem

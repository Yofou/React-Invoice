import { Invoice } from "@lib/stores/invoices-types"
import Image from "next/image"
import Link from "next/link"
import InvoiceStatus from "@components/top-level/invoice-status"

type InvoiceItemProps = { invoice: Invoice }
const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
	
	const readableDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format( invoice.invoiceData )
	const total = invoice.items.reduce((total, curr) => total + (curr.price * curr.qty), 0)
	const readableTotal = new Intl.NumberFormat("en-GB", { currency: "GBP", style: "currency" }).format( total )

	return <li className="bg-grey-1500 rounded-[8px] text-white-full text-body-1">
		<Link href={`/invoices/${invoice.id}`}>
			<a className="w-full flex py-4 pl-8 pr-6 items-center">
				<h1 className="font-bold mr-[45px]">#{invoice.id}</h1>
				<p className="mr-[41px]">Due {readableDate}</p>
				<p className="mr-[112px]">{invoice.billTo.name}</p>
				<p className="text-h3 mr-10">{readableTotal}</p>
				<InvoiceStatus status={invoice.paymentStatus} />
				<div className="relative ml-5">
					<Image src="/icon-arrow-right.svg" alt="" layout="fixed" width="7px" height="10px"  />
				</div>
			</a>
		</Link>
		
	</li>
}

export default InvoiceItem

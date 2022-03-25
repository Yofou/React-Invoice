import { RootState } from "@lib/stores"
import Image from "next/image"
import { useSelector } from "react-redux"
import InvoiceItem from "./invoice-item"

const InvoiceContainer: React.FC = () => {
	const invoices = useSelector( (state: RootState) => state.invoices )

	if (invoices.length === 0) return <section className="flex flex-col items-center gap-6">
		<div className="mb-10">
			<Image src="/illustration-empty.svg" alt="" layout="fixed" width="242px" height="200px" />
		</div>
		<h1 className="text-h2 text-white-full">There is nothing here</h1>
		<p className="text-body-1 text-white-300 max-w-[23ch] text-center">
			Create an invoice by clicking the
			<span className="!font-bold"> New Invoice</span> button and get started
		</p>
	</section>

	return <ul className="w-full flex flex-col gap-4">
		{invoices.map(invoice => (
			<InvoiceItem invoice={invoice} key={invoice.id} />
		))}
	</ul>
}

export default InvoiceContainer

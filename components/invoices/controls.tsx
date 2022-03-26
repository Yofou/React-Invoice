import Button from "@components/top-level/button"
import InvoiceStatus from "@components/top-level/invoice-status"
import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"

const InvoiceControls: React.FC = () => {
	const invoice = useContext(InvoiceContext)
	if (!invoice) return <></>

	return <nav className="grid grid-rows-1 grid-cols-[max-content,1fr,repeat(3,max-content)] gap-2 w-full px-8 py-5 bg-grey-1500 rounded-[8px]" aria-label="invoie controls">
		<h1 className="flex gap-4 text-white-full text-body-1 items-center">
			Status <InvoiceStatus status={invoice.paymentStatus} />
		</h1>

		<Button className="justify-self-end text-grey-300 bg-grey-1200 text-h4">Edit</Button>
		<Button className="text-white-full bg-red-600 text-h4">Delete</Button>
		<Button className="text-white-full bg-purple-600 text-h4">Mark as Paid</Button>
	</nav>
}

export default InvoiceControls

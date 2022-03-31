import Button from "@components/top-level/button"
import InvoiceStatus from "@components/top-level/invoice-status"
import { InvoiceContext } from "pages/invoices/[id]"
import { useContext, useState } from "react"
import ConfirmDeleteModel from "./confirm-delete-model"
import EditInvoice from "./edit-invoice"

const InvoiceControls: React.FC = () => {
	const invoice = useContext(InvoiceContext)
	const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
	const onDeleteButtonClick = () => setIsDeleteModelOpen(true)
	const onDeleteClick = () => setIsDeleteModelOpen(false)
	const onModelCancel = () => setIsDeleteModelOpen(false)

	const [isEditInvoiceOpen, setIsEditInvoiceOpen] = useState(false)
	const onEditInvoiceClick = () => setIsEditInvoiceOpen(true)
	const onEditInvoiceCancel = () => setIsEditInvoiceOpen(false)

	if (!invoice) return <></>

	return <nav className="grid grid-rows-1 grid-cols-[max-content,1fr,repeat(3,max-content)] gap-2 w-full px-8 py-5 bg-grey-1500 rounded-[8px]" aria-label="invoie controls">
		<h1 className="flex gap-4 text-white-full text-body-1 items-center justify-between sm:justify-start col-start-1 col-end-[-1] sm:col-auto">
			Status <InvoiceStatus status={invoice.paymentStatus} />
		</h1>

		<Button onClick={onEditInvoiceClick} className="hidden sm:inline-block justify-self-end text-grey-300 bg-grey-1200 text-h4">Edit</Button>
		<EditInvoice isOpen={isEditInvoiceOpen} onCancel={onEditInvoiceCancel} />
		<Button onClick={onDeleteButtonClick} className="hidden sm:inline-block text-white-full bg-red-600 text-h4">Delete</Button>
		<ConfirmDeleteModel isOpen={isDeleteModelOpen} onCancel={onModelCancel} onDelete={onDeleteClick} />
		<Button className="hidden sm:inline-block text-white-full bg-purple-600 text-h4">Mark as Paid</Button>
	</nav>
}

export default InvoiceControls

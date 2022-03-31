import Button from "@components/top-level/button"
import InvoiceForm from "@components/top-level/invoice-aside"
import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"

type EditInvoiceProps = { isOpen: boolean, onCancel: () => void }
const EditInvoice: React.FC<EditInvoiceProps> = ({ isOpen, onCancel }) => {
	const invoice = useContext(InvoiceContext)
	if (!invoice) return <></>
	return <InvoiceForm invoice={invoice} isOpen={isOpen} onCancel={onCancel}>
		<>Edit <span className="text-grey-600 font-bold">#</span>{invoice.id}</>

		<div className="w-full h-full flex gap-2 justify-end items-center">
			<Button onClick={onCancel} className="bg-[#252945] text-grey-300 text-h4">Cancel</Button>
			<Button className="bg-purple-600 text-white-full text-h4">Save Changes</Button>
		</div>
	</InvoiceForm>
}

export default EditInvoice

import Button from "@components/top-level/button"
import InvoiceForm from "@components/top-level/invoice-aside"
import { AppDispatch } from "@lib/stores"
import { updateInvoice } from "@lib/stores/invoices"
import { Invoice } from "@lib/stores/invoices-types"
import { InvoiceContext } from "pages/invoices/[id]"
import { createRef, useContext } from "react"
import { useDispatch } from "react-redux"

type EditInvoiceProps = { isOpen: boolean, onCancel: () => void }
const EditInvoice: React.FC<EditInvoiceProps> = ({ isOpen, onCancel }) => {
	const invoice = useContext(InvoiceContext)
	const dispatch = useDispatch<AppDispatch>()

	const formRef = createRef<HTMLFormElement>()
	const onSaveChanges = () => {
		const submitEvent = new SubmitEvent("submit", {
			"bubbles": true,
			"cancelable": true,
		})

   		formRef.current?.dispatchEvent( submitEvent ) 
	}
	
	const saveChanges = (newInvoice: Invoice) => {
		dispatch( updateInvoice( newInvoice ) )
		onCancel()
	}

	if (!invoice) return <></>
	return <InvoiceForm onFormSubmit={saveChanges} ref={formRef} invoice={invoice} isOpen={isOpen} onCancel={onCancel}>
		<>Edit <span className="text-grey-600 font-bold">#</span>{invoice.id}</>

		<div className="w-full h-full flex gap-2 justify-end items-center">
			<Button onClick={onCancel} className="bg-[#252945] text-grey-300 text-h4">Cancel</Button>
			<Button onClick={onSaveChanges} className="bg-purple-600 text-white-full text-h4">Save Changes</Button>
		</div>
	</InvoiceForm>
}

export default EditInvoice

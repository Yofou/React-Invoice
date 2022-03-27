import InvoiceForm from "@components/top-level/invoice-form"

type NewInvoiceProps = { isOpen: boolean, onCancel: () => void }
const NewInvoice: React.FC<NewInvoiceProps> = ({ isOpen, onCancel }) => {
	return <InvoiceForm isOpen={isOpen} onCancel={onCancel}>
		<h1>New Invoice</h1>
	</InvoiceForm>
}

export default NewInvoice

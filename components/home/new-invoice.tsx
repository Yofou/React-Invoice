import InvoiceForm from "@components/top-level/invoice-aside"
import Button from "@components/top-level/button"

type NewInvoiceProps = { isOpen: boolean, onCancel: () => void }
const NewInvoice: React.FC<NewInvoiceProps> = ({ isOpen, onCancel }) => {
	return <InvoiceForm isOpen={isOpen} onCancel={onCancel}>
		<>New Invoice</>

		<div className="w-full h-full grid grid-cols-[max-content,1fr,max-content] gap-2 items-center justify-items-start">
			<Button onClick={onCancel} className="bg-[#F9FAFE] text-grey-900 text-h4">Discard</Button>
			<Button className="bg-[#373B53] text-grey-300 text-h4 justify-self-end">Save as Draft</Button>
			<Button className="bg-purple-600 text-white-full text-h4">Save & Send</Button>
		</div>
	</InvoiceForm>
}

export default NewInvoice

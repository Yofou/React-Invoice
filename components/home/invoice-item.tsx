import { Invoice } from "@lib/stores/invoices-types"

type InvoiceItemProps = { invoice: Invoice }
const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
	return <li>{invoice.id}</li>
}

export default InvoiceItem

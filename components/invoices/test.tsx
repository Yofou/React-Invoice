import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"

export const Test: React.FC = () => {
	const invoice = useContext(InvoiceContext)
	return <p>{invoice?.id}</p>
}

export default Test

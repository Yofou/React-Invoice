import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"

const InvoiceTableHeading: React.FC<{ className?: string }> = ({ children, className }) => {
	return <h1 className={`text-body-2 text-grey-300 ${className ?? ""}`}>{children}</h1>
}

const InvoiceTableItem: React.FC<{className?: string}> = ({ children, className }) => {
	return <p className={`text-grey-300 text-h4 ${className}`}>{children}</p>
}

type InvoiceViewTableProps = { className?: string }
export const InvoiceViewTable: React.FC<InvoiceViewTableProps> = ({ className }) => {
	const invoice = useContext(InvoiceContext)
	const priceFormater = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })

	return <div className={`grid grid-cols-[minmax(286px,max-content),repeat(3,1fr)] grid-flow-row gap-y-8 justify-items-end bg-grey-1200 w-full p-8 pb-10 rounded-t-[8px] ${className ?? ""}`}>
		<InvoiceTableHeading className="justify-self-start">Item Name</InvoiceTableHeading>
		<InvoiceTableHeading>QTY.</InvoiceTableHeading>
		<InvoiceTableHeading>Price</InvoiceTableHeading>
		<InvoiceTableHeading>Total</InvoiceTableHeading>
		{invoice?.items.map( item => <>
			<InvoiceTableItem className="justify-self-start !text-white-full">{item.name}</InvoiceTableItem>
			<InvoiceTableItem className="transform translate-x-[calc(-28px/2)]">{item.qty}</InvoiceTableItem>
			<InvoiceTableItem>{priceFormater.format(item.price)}</InvoiceTableItem>
			<InvoiceTableItem className="!text-white-full">{priceFormater.format(item.price * item.qty)}</InvoiceTableItem>
		</>)}
	</div>
}

export default InvoiceViewTable

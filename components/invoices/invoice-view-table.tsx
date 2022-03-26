import { InvoiceContext } from "pages/invoices/[id]"
import { useContext } from "react"
import React from "react"

const InvoiceTableHeading: React.FC<{ className?: string }> = ({ children, className }) => {
	return <h1 className={`hidden sm:block text-body-2 text-grey-300 ${className ?? ""}`}>{children}</h1>
}

const InvoiceTableItem: React.FC<{className?: string}> = ({ children, className }) => {
	return <p className={`text-grey-300 text-h4 ${className}`}>{children}</p>
}

type InvoiceViewTableProps = { className?: string }
export const InvoiceViewTable: React.FC<InvoiceViewTableProps> = ({ className }) => {
	const invoice = useContext(InvoiceContext)
	const priceFormater = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })

	return <div className={`grid grid-cols-[max-content,1fr] sm:grid-cols-[minmax(286px,max-content),repeat(3,1fr)] grid-flow-row sm:gap-y-8 justify-items-end bg-grey-1200 w-full p-6 sm:p-8 pb-10 rounded-t-[8px] ${className ?? ""}`}>
		<InvoiceTableHeading className="justify-self-start">Item Name</InvoiceTableHeading>
		<InvoiceTableHeading>QTY.</InvoiceTableHeading>
		<InvoiceTableHeading>Price</InvoiceTableHeading>
		<InvoiceTableHeading>Total</InvoiceTableHeading>
		{invoice?.items.map( (item, index) => <React.Fragment key={index}>
			<InvoiceTableItem className="justify-self-start !text-white-full mt-6 sm:mt-0 first-of-type:mt-0">{item.name}</InvoiceTableItem>
			<InvoiceTableItem className="hidden sm:block transform translate-x-[calc(-28px/2)]">{item.qty}</InvoiceTableItem>
			<InvoiceTableItem className="hidden sm:block">{priceFormater.format(item.price)}</InvoiceTableItem>
			<h2 className="text-white-full text-h4 row-span-2 sm:row-auto self-center transform first-of-type:transform-none sm:transform-none translate-y-[80%]">{priceFormater.format(item.price * item.qty)}</h2>
			<p className="sm:hidden text-h4 text-grey-600 justify-self-start">{item.qty} x {priceFormater.format(item.price)}</p>
		</React.Fragment>)}
	</div>
}

export default InvoiceViewTable

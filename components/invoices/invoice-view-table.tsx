import { InvoiceContext } from "pages/invoices/[id]";
import { useContext } from "react";
import React from "react";

const InvoiceTableHeading: React.FC<{ className?: string }> = ({
	children,
	className,
}) => {
	return (
		<h1
			className={`hidden text-grey-300 text-body-2 dark:text-grey-900 sm:block ${
				className ?? ""
			}`}
		>
			{children}
		</h1>
	);
};

const InvoiceTableItem: React.FC<{ className?: string }> = ({
	children,
	className,
}) => {
	return (
		<p className={`text-grey-300 text-h4 dark:text-grey-900 ${className}`}>
			{children}
		</p>
	);
};

type InvoiceViewTableProps = { className?: string };
export const InvoiceViewTable: React.FC<InvoiceViewTableProps> = ({
	className,
}) => {
	const invoice = useContext(InvoiceContext);
	const priceFormater = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	});

	return (
		<div
			className={`grid w-full grid-flow-row grid-cols-[max-content,1fr] justify-items-end rounded-t-[8px] bg-grey-1200 p-6 pb-10 transition-colors dark:bg-white-300 sm:grid-cols-[minmax(286px,max-content),repeat(3,1fr)] sm:gap-y-8 sm:p-8 ${
				className ?? ""
			}`}
		>
			<InvoiceTableHeading className="justify-self-start">
				Item Name
			</InvoiceTableHeading>
			<InvoiceTableHeading>QTY.</InvoiceTableHeading>
			<InvoiceTableHeading>Price</InvoiceTableHeading>
			<InvoiceTableHeading>Total</InvoiceTableHeading>
			{invoice?.items.map((item, index) => (
				<React.Fragment key={index}>
					<InvoiceTableItem className="mt-6 justify-self-start !text-white-full first-of-type:mt-0 dark:!text-black-600 sm:mt-0">
						{item.name}
					</InvoiceTableItem>
					<InvoiceTableItem className="hidden translate-x-[calc(-28px/2)] transform sm:block">
						{item.qty}
					</InvoiceTableItem>
					<InvoiceTableItem className="hidden sm:block">
						{priceFormater.format(item.price)}
					</InvoiceTableItem>
					<h2 className="row-span-2 translate-y-[80%] transform self-center text-white-full text-h4 first-of-type:transform-none dark:text-black-600 sm:row-auto sm:transform-none">
						{priceFormater.format(item.price * item.qty)}
					</h2>
					<p className="justify-self-start text-grey-600 text-h4 dark:text-grey-900 sm:hidden">
						{item.qty} x {priceFormater.format(item.price)}
					</p>
				</React.Fragment>
			))}
		</div>
	);
};

export default InvoiceViewTable;

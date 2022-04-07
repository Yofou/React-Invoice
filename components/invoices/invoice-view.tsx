import { DateTime, Duration } from "luxon";
import { InvoiceContext } from "pages/invoices/[id]";
import { useContext } from "react";
import InvoiceViewAmount from "./invoice-view-amount";
import InvoiceViewItem from "./invoice-view-item";
import InvoiceViewTable from "./invoice-view-table";

const InvoiceView: React.FC = () => {
	const invoice = useContext(InvoiceContext);
	if (!invoice) return <></>;
	const invoiceDate = DateTime.fromMillis(invoice.invoiceDate);
	const readableInvoiceDate = invoiceDate.toFormat("d LLL yyyy");

	const duration = Duration.fromObject({ day: invoice.paymentTerms });
	const paymentDue = invoiceDate.plus(duration).toFormat("d LLL yyyy");

	const totalAmount = invoice.items.reduce(
		(total, curr) => total + curr.price * curr.qty,
		0
	);

	return (
		<section className="grid w-full grid-cols-[minmax(0,max-content),1fr] grid-rows-[repeat(7,max-content)] gap-x-10 rounded-[8px] bg-grey-1500 p-8 transition-colors dark:bg-white-full dark:shadow-invoiceBase sm:grid-cols-[repeat(2,minmax(0,max-content)),1fr] sm:grid-rows-[repeat(5,max-content)] sm:gap-x-[100px] md:p-12">
			<h1 className="hidden">invoice of #{invoice.id}</h1>

			<div className="col-start-1 col-end-[-1] row-start-1 row-end-2 mb-[30px] flex flex-col sm:col-end-2 sm:mb-0 sm:gap-2">
				<h1 className="uppercase text-white-full text-h4 dark:text-black-600 md:text-h3">
					<span className="text-grey-600">#</span>
					{invoice.id}
				</h1>
				<p className="text-grey-300 text-body-1 dark:text-grey-900">
					{invoice.projectDescription}
				</p>
			</div>

			<address className="col-start-1 col-end-[-1] mb-[30px] not-italic text-grey-300 text-body-2 dark:text-grey-900 sm:col-start-3 sm:col-end-4 sm:mb-5 sm:self-end sm:text-right">
				{invoice.billFrom.address}
				<br />
				{invoice.billFrom.city}
				<br />
				{invoice.billFrom.postCode}
				<br />
				{invoice.billFrom.country}
			</address>

			<InvoiceViewItem title="Invoice Date">
				{readableInvoiceDate}
			</InvoiceViewItem>
			<InvoiceViewItem title="Bill to">{invoice.billTo.name}</InvoiceViewItem>
			<InvoiceViewItem
				className="row-start-5 row-end-6 mt-8 sm:row-auto sm:mt-0 sm:ml-[10px]"
				title="Sent to"
			>
				{invoice.billTo.email}
			</InvoiceViewItem>
			<InvoiceViewItem className="self-end" title="Payment Due">
				{paymentDue}
			</InvoiceViewItem>

			<address className="mt-2 not-italic text-grey-300 text-body-2 dark:text-grey-900">
				{invoice.billTo.address}
				<br />
				{invoice.billTo.city}
				<br />
				{invoice.billTo.postCode}
				<br />
				{invoice.billTo.country}
			</address>

			<InvoiceViewTable className="col-start-1 col-end-[-1] mt-[45px]" />
			<InvoiceViewAmount
				className="col-start-1 col-end-[-1]"
				amount={totalAmount}
			/>
		</section>
	);
};

export default InvoiceView;

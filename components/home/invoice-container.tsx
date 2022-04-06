import { RootState } from "@lib/stores";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSelector } from "react-redux";
import InvoiceItem from "./invoice-item";

const InvoiceContainer: React.FC = () => {
	const { invoices, filterByStatus } = useSelector((state: RootState) => state);
	const filterInvoices =
		filterByStatus.length === 0
			? invoices
			: invoices.filter((invoice) => {
					return filterByStatus.includes(invoice.paymentStatus);
			  });

	if (invoices.length === 0)
		return (
			<section className="flex flex-col items-center gap-6">
				<div className="mb-10">
					<Image
						src="/illustration-empty.svg"
						alt=""
						layout="fixed"
						width="242px"
						height="200px"
					/>
				</div>
				<h1 className="text-white-full text-h2">There is nothing here</h1>
				<p className="max-w-[23ch] text-center text-white-300 text-body-1">
					Create an invoice by clicking the
					<span className="!font-bold"> New Invoice</span> button and get
					started
				</p>
			</section>
		);

	return (
		<ul className="flex w-full flex-col gap-4">
			<AnimatePresence>
				{filterInvoices.map((invoice) => (
					<InvoiceItem invoice={invoice} key={invoice.id} />
				))}
			</AnimatePresence>
		</ul>
	);
};

export default InvoiceContainer;

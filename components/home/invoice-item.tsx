import { Invoice } from "@lib/stores/invoices-types";
import Image from "next/image";
import Link from "next/link";
import InvoiceStatus from "@components/top-level/invoice-status";
import { DateTime, Duration } from "luxon";
import { motion } from "framer-motion";

type InvoiceItemProps = { invoice: Invoice };
const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
	const invoiceDate = DateTime.fromMillis(invoice.invoiceDate);
	const duration = Duration.fromObject({ day: invoice.paymentTerms });

	const readableDate = invoiceDate.plus(duration).toFormat("d LLL yyyy");
	const total = invoice.items.reduce(
		(total, curr) => total + curr.price * curr.qty,
		0
	);
	const readableTotal = new Intl.NumberFormat("en-GB", {
		currency: "GBP",
		style: "currency",
	}).format(total);

	return (
		<motion.li
			layout
			className="rounded-[8px] bg-grey-1500 text-white-full text-body-1"
			exit={{ opacity: 0 }}
		>
			<Link href={`/invoices/${invoice.id}`}>
				<a className="grid w-full grid-cols-[max-content,1fr] grid-rows-[repeat(3,max-content)] items-center p-6 sm:grid-cols-[repeat(3,minmax(0,max-content)),1fr,repeat(2,minmax(0,max-content))] sm:grid-rows-1 sm:gap-[34px] sm:py-4 sm:pl-8 sm:pr-6">
					<h1 className="font-bold">
						<span className="text-grey-600">#</span>
						{invoice.id}
					</h1>
					<p className="mt-6 sm:mt-0">Due {readableDate}</p>
					<p className="col-start-2 col-end-3 row-start-1 row-end-2 justify-self-end sm:col-auto sm:row-auto sm:justify-self-start">
						{invoice.billTo.name}
					</p>
					<p className="self-end text-h3 sm:justify-self-end">
						{readableTotal}
					</p>
					<InvoiceStatus
						className="col-start-2 col-end-3 row-start-2 row-end-[-1] mb-1 self-end justify-self-end sm:col-auto sm:row-auto sm:mb-0 sm:justify-self-start"
						status={invoice.paymentStatus}
					/>
					<div className="relative hidden md:block">
						<Image
							src="/icon-arrow-right.svg"
							alt=""
							layout="fixed"
							width="7px"
							height="10px"
						/>
					</div>
				</a>
			</Link>
		</motion.li>
	);
};

export default InvoiceItem;

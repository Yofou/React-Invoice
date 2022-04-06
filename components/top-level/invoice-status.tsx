import { PaymentStatus } from "@lib/stores/invoices-types";
import { CSSProperties } from "react";

const statusToColor = {
	[PaymentStatus.Draft]: "#DFE3FA",
	[PaymentStatus.Pending]: "#FF8F00",
	[PaymentStatus.Paid]: "#33D69F",
};

type InvoiceStatusProps = { status: PaymentStatus; className?: string };
const InvoiceStatus: React.FC<InvoiceStatusProps> = ({ status, className }) => {
	const style = {
		"--bg": `${statusToColor[status]}1A`,
		"--color": statusToColor[status],
	} as CSSProperties;

	return (
		<div
			className={`list-item min-w-[104px] list-inside list-disc rounded-[6px] bg-[color:var(--bg)] bg-opacity-60 px-[18px] py-3 text-center font-bold capitalize text-[color:var(--color)] ${
				className ?? ""
			}`}
			style={style}
		>
			{status}
		</div>
	);
};

export default InvoiceStatus;

type InvoiceViewAmountProps = { className?: string; amount: number };
const InvoiceViewAmount: React.FC<InvoiceViewAmountProps> = ({
	className,
	amount,
}) => {
	const amountFormated = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(amount);

	return (
		<div
			className={`flex w-full items-center justify-between rounded-b-[8px] bg-black-600 p-6 transition-colors dark:bg-[#373B53] sm:p-8 ${
				className ?? ""
			}`}
		>
			<p className="text-white-full text-body-1">Amount Due</p>
			<h2 className="text-[24px] font-bold leading-[32px] tracking-[-0.5px] text-white-full">
				{amountFormated}
			</h2>
		</div>
	);
};

export default InvoiceViewAmount;

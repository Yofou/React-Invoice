type InvoiceViewAmountProps = { className?: string, amount: number }
const InvoiceViewAmount: React.FC<InvoiceViewAmountProps> = ({ className, amount }) => {
	const amountFormated = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format( amount )

	return <div className={`w-full flex justify-between items-center p-6 sm:p-8 bg-black-600 rounded-b-[8px] ${className ?? ""}`}>
		<p className="text-white-full text-body-1">Amount Due</p>
		<h2 className="text-white-full text-[24px] tracking-[-0.5px] leading-[32px] font-bold">{amountFormated}</h2>
	</div>
}

export default InvoiceViewAmount

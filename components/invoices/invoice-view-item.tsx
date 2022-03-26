type InvoiceViewItemProps = { title: string, className?: string }
const InvoiceViewItem: React.FC<InvoiceViewItemProps> = ({ title, children, className }) => {
	return <div className={`flex flex-col gap-3 ${className}`}>
		<h2 className="text-grey-300 text-body-1">{title}</h2>
		<p className="text-white-full font-bold text-[15px] tracking-[-0.31px] leading-[20px]">{ children }</p>
	</div>
}

export default InvoiceViewItem

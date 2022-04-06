type InvoiceViewItemProps = { title: string; className?: string };
const InvoiceViewItem: React.FC<InvoiceViewItemProps> = ({
	title,
	children,
	className,
}) => {
	return (
		<div className={`flex flex-col gap-3 ${className}`}>
			<h2 className="text-grey-300 text-body-1">{title}</h2>
			<p className="text-[15px] font-bold leading-[20px] tracking-[-0.31px] text-white-full">
				{children}
			</p>
		</div>
	);
};

export default InvoiceViewItem;

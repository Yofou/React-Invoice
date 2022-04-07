import ShortUniqueId from "short-unique-id";
import InvoiceCalender from "./invoice-calender";

type InvoiceLabelCalenderProps = {
	className?: string;
	selected: number;
	setSelected: (value: number) => void;
};
const InvoiceLabelCalender: React.FC<InvoiceLabelCalenderProps> = ({
	className,
	children,
	selected,
	setSelected,
}) => {
	const id = new ShortUniqueId({ length: 5 })();
	return (
		<div className={`${className} flex w-full flex-col gap-[10px]`}>
			<label
				className="text-grey-300 text-body-1 dark:text-grey-900"
				htmlFor={id}
			>
				{children}
			</label>
			<InvoiceCalender id={id} selected={selected} setSelected={setSelected} />
		</div>
	);
};

export default InvoiceLabelCalender;

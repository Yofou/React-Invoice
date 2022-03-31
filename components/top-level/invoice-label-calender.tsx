import { DateTime } from "luxon"
import ShortUniqueId from "short-unique-id"
import InvoiceCalender from "./invoice-calender"

type InvoiceLabelCalenderProps = { className?: string, selected: DateTime, setSelected: (value: DateTime) => void }
const InvoiceLabelCalender: React.FC<InvoiceLabelCalenderProps> = ({ className, children, selected, setSelected }) => {
	const id = (new ShortUniqueId({ length: 5 }))()
	return <div className={`${className} w-full flex flex-col gap-[10px]`}>
		<label className="text-body-1 text-grey-300" htmlFor={id}>{children}</label>
		<InvoiceCalender id={id} selected={selected} setSelected={setSelected} />
	</div>
}

export default InvoiceLabelCalender

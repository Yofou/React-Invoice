import ShortUniqueId from "short-unique-id"
import InvoiceDropDown from "./invoice-dropdown"

type InvoiceLabelDropDownProps<T> = React.PropsWithChildren<{ 
	className?: string, 
	selected: T,
	options: T[], 
	onOptionSelect: (value: T) => void,
	optionDisplay?: (value: T) => string,
}>

const defaultOptionDispaly = <T,>(value: T) => `${value}` 

type InvoiceLabelDropdownComponent = <T>(props: InvoiceLabelDropDownProps<T>) => React.ReactElement<InvoiceLabelDropDownProps<T>>

const InvoiceLabelDropDown: InvoiceLabelDropdownComponent = ({ className, options, onOptionSelect, optionDisplay = defaultOptionDispaly, children, selected }) => {
	const id = (new ShortUniqueId({ length: 5 }))()
	return <div className={`${className} w-full flex flex-col gap-[10px]`}>
		<label className="text-body-1 text-grey-300" htmlFor={id}>{children}</label>
		<InvoiceDropDown selected={selected} id={id} onOptionSelected={onOptionSelect} options={options} optionDisplay={optionDisplay} />
	</div>
}

export default InvoiceLabelDropDown
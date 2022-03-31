import { HTMLInputTypeAttribute } from "react"
import ShortUniqueId from "short-unique-id"
import InvoiceInput from "./invoice-input"

type InvoiceLabelInputProps<T> = React.PropsWithChildren<{ 
	className?: string, 
	type?: HTMLInputTypeAttribute,
	value?: T,
	onValueChange?: (value: T) => void
}>

type InvoiceLabelInputComponent = <T extends string | number>(props: InvoiceLabelInputProps<T>) => React.ReactElement<InvoiceLabelInputProps<T>>
const InvoiceLabelInput: InvoiceLabelInputComponent = ({ className, type="text", children, value, onValueChange }) => {
	const id = (new ShortUniqueId({ length: 5 }))()
	return <div className={`${className} w-full flex flex-col gap-[10px]`}>
		<label className="text-body-1 text-grey-300" htmlFor={id}>{children}</label>
		<InvoiceInput id={id} type={type} value={value} onValueChange={onValueChange} />
	</div>
}

export default InvoiceLabelInput

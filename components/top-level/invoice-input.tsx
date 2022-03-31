import { HTMLInputTypeAttribute } from "react"
import style from "@styles/invoice-input.module.css"

type InvoiceInputProps<T> = { 
	className?: string, 
	id?: string, 
	type?: HTMLInputTypeAttribute,
	value?: T,
	onValueChange?: (value: T) => void
}

type InvoiceInputComponent = <T extends string | number>(prop: InvoiceInputProps<T>) => React.ReactElement<InvoiceInputProps<T>>

const InvoiceInput: InvoiceInputComponent = ({ type="text", id, className, value, onValueChange }) => {
	return <input 
		id={id}	
		className={`${className} ${style.input} w-full px-5 py-4 bg-grey-1500 text-white-full rounded-[4px] border border-grey-1200 focus:border-purple-600 caret-purple-600 outline-none text-h4`}
		type={type}
		min="0"
		value={value}
		onChange={({ target }) => {
			if (onValueChange) {
				if (typeof value === "string") {
					onValueChange( target.value as any )
				} else if (typeof value === "number") {
					if (!isNaN(target.valueAsNumber)) onValueChange( target.valueAsNumber as any )
				} else {
					new Error("Unknown value type")
				}
			}
		}}
	/>
}

export default InvoiceInput

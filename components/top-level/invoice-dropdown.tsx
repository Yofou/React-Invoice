import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import { motion } from "framer-motion"

type InvoiceDropDownProps<T> = React.PropsWithChildren<{ 
	id?: string, 
	selected: T,
	onOptionSelected: (value: T) => void 
	options: T[], 
	optionDisplay?: (value: T) => string,
}>

type InvoiceDropDownComponent = <T>(props: InvoiceDropDownProps<T>) => React.ReactElement<InvoiceDropDownProps<T>> 
const InvoiceDropDown: InvoiceDropDownComponent = ({ id, options, onOptionSelected, selected, optionDisplay = (value) => value }) => {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) })

	type T = typeof options[number]
	const onDropdownClick = () => setIsOpen(!isOpen) 
	const onSelected = (value: T) => () => {
 		onOptionSelected(value)
	}

	return <div ref={ref} className="relative z-30">
		<button 
			id={id} 
			type="button" 
			onClick={onDropdownClick} 
			className="w-full py-4 px-5 bg-grey-1500 border border-grey-1200 rounded-[4px] text-white-full text-h4 flex items-center justify-between"
		>
			{optionDisplay(selected)}
			<Image className={`transition-transform transform ${isOpen ? "-rotate-180" : ""}`} src="/icon-arrow-down.svg" alt="" layout="fixed" width="10px" height="7px" />
		</button>
		
		<AnimatePresence>
			{isOpen && (
				<motion.div 
					className="absolute top-[calc(100%+8px)] left-0 flex flex-col w-full bg-grey-1200 rounded-[8px] z-20"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ type: "spring", damping: 10, stiffness: 100, duration: 200 }}
				>
					{options.map( (option, index) => (
						<button className="text-h4 text-left px-6 py-4 text-grey-300 hover:text-purple-600 last-of-type:border-b-0 border-b border-grey-1500" onClick={onSelected(option)} key={index}>
							{optionDisplay(option)}
						</button>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	</div>
}

export default InvoiceDropDown

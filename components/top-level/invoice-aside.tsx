import { useDetectClickOutside } from "@lib/click-outside"
import { motion } from "framer-motion"
import { Children, FormEventHandler, useEffect, useRef, useState } from "react"
import Dialog from "./dialog"
import styles from "@styles/invoice-form.module.css"
import InvoiceForm from "@components/top-level/invoice-form"
import { Invoice } from "@lib/stores/invoices-types"

type InvoiceAsideProps = { invoice?: Invoice, isOpen: boolean, onCancel: () => void }
const InvoiceAside: React.FC<InvoiceAsideProps> = ({ isOpen, onCancel, children, invoice }) => {
	const [title, buttons] = Children.toArray( children )
	const ref = useRef(null)
	const [disableClick, setDisableClick] = useState(true)

	const onSubmit: FormEventHandler<HTMLFormElement>= (event) => {
		event.preventDefault()
	}
	
	useDetectClickOutside({
		ref,
		onTriggered: (e: Event) => { 
			if ( e?.target instanceof HTMLImageElement || e?.target instanceof HTMLButtonElement ) return 
			onCancel() 
		},	
		disableClick
	})

	useEffect(() => {
		let timeoutID: NodeJS.Timeout
		if (isOpen) {
			timeoutID = setTimeout(() => setDisableClick(false), 100)
		} else {
			setDisableClick(true)
		}

		return () => clearTimeout(timeoutID)
	}, [isOpen])

	return <Dialog className="!absolute md:!fixed" isOpen={isOpen}>
		<motion.aside 
			ref={ref}
			className="px-6 md:pl-[calc(103px+57px)] md:pr-8 pt-[calc(80px+32px)] md:pt-[56px] w-full min-h-full md:h-full bg-black-300 max-w-[calc(616px+103px)] grid grid-rows-[max-content,1fr,91px] md:grid-rows-[max-content,calc(100vh-2.25rem-110px-56px),110px]"
			initial={{ x: "-100%" }}
			animate={{ x: "0%" }}
			exit={{ x: "-100%" }}
			transition={{ type: "spring", duration: 0.4 }}
		>
			<h1 className="text-white-300 text-h1">
				{title}
			</h1>
			
			<InvoiceForm invoice={invoice} onSubmit={onSubmit} />
			
			<div className={`${styles["bg-shadow"]} relative bg-black-300 md:pl-[calc(calc(103px+57px))] px-6 md:pr-[56px] -ml-6 md:-ml-[calc(103px+57px)] rounded-tr-[20px] -mr-6 md:-mr-8`}>
				{buttons}
			</div>
		</motion.aside>
	</Dialog>
}

export default InvoiceAside

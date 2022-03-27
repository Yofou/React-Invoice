import { useDetectClickOutside } from "@lib/click-outside"
import { useEffect, useRef, useState } from "react"
import Dialog from "./dialog"

type InvoiceFormProps = { isOpen: boolean, onCancel: () => void }
const InvoiceForm: React.FC<InvoiceFormProps> = ({ isOpen, onCancel, children }) => {
	const ref = useRef(null)
	const [disableClick, setDisableClick] = useState(true)
	
	useDetectClickOutside({
		ref,
		onTriggered: (e: Event) => onCancel(),	
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

	return <Dialog isOpen={isOpen}>
		<div ref={ref} className="pl-[103px] w-full h-full bg-black-300 max-w-[calc(616px+103px)]">
			{children}
		</div>
	</Dialog>
}

export default InvoiceForm

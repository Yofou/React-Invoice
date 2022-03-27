import Button from "@components/top-level/button"
import Dialog from "@components/top-level/dialog"
import { useDetectClickOutside } from "@lib/click-outside"
import { InvoiceContext } from "pages/invoices/[id]"
import { useContext, useEffect, useRef, useState } from "react"

type ConfirmDeleteModelProps = { isOpen: boolean, onCancel: () => void, onDelete?: () => void }
const ConfirmDeleteModel: React.FC<ConfirmDeleteModelProps> = ({ isOpen, onCancel, onDelete }) => {
	const invoice = useContext(InvoiceContext)
	const [disableClick, setDisableClick] = useState(true)
	const ref = useRef(null)

	useDetectClickOutside({ 
		ref,
		onTriggered: (e: Event) => {
			onCancel()
		},
		disableClick,
	})

	useEffect(() => {
		let timeoutID: NodeJS.Timeout | undefined = undefined
		if (isOpen) { 
			timeoutID = setTimeout( () => setDisableClick(false), 100 )
		} else {
			setDisableClick(true)
		}

		return () => timeoutID && clearTimeout(timeoutID)
	}, [isOpen])

	if (!invoice) return <></>

	return <Dialog zIndex={20} isOpen={isOpen}>
		<div ref={ref} className="mx-6 max-w-[480px] place-self-center bg-grey-1500 rounded-[8px] flex flex-col gap-3 p-12">
			<h1 className="text-[24px] tracking-[-0.8px] leading-[32px] font-bold text-white-full">Confirm Deletion</h1>
			<p className="text-body-1 text-grey-300">Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.</p>
			<div className="w-full flex justify-end gap-2 mt-1">
				<Button onClick={onCancel} className="text-grey-300 bg-grey-1200 text-h4">Cancel</Button>
				<Button onClick={onDelete} className="text-white-full bg-red-600 text-h4">Delete</Button>
			</div>
		</div>
	</Dialog>
}

export default ConfirmDeleteModel

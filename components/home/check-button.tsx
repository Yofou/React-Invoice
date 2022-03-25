import { AppDispatch, RootState } from "@lib/stores"
import { addOrRemoveFilter } from "@lib/stores/filter-by-status"
import { PaymentStatus } from "@lib/stores/invoices-types"
import Image from "next/image"
import { MouseEventHandler } from "react"
import { useDispatch, useSelector } from "react-redux"

type CheckButtonProps = { invoiceStatus: PaymentStatus }
const CheckButton: React.FC<CheckButtonProps> = ({ children, invoiceStatus }) => {
	const filterByStatus = useSelector( (state: RootState) => state.filterByStatus )
	const dispatch = useDispatch<AppDispatch>()

	const isActive = filterByStatus.includes( invoiceStatus )
	const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch( addOrRemoveFilter( invoiceStatus ) )

	return <button onClick={onClick} className="flex gap-[13px] items-center">
		<div className={`relative grid place-content-center border border-purple-600 w-4 h-4 rounded-[2px] ${isActive ? "bg-purple-600" : "bg-grey-1500"}`}>
			{ isActive && <Image src="/icon-check.svg" alt="" layout="fixed" width="10px" quality={1} height="8px" /> }
		</div>
		<p className="text-white-full text-h4 capitalize">{ children }</p>
	</button>
}

export default CheckButton

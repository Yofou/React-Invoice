import Button from "@components/top-level/button"
import { RootState } from "@lib/stores"
import { PaymentStatus } from "@lib/stores/invoices-types"
import Image from "next/image"
import { useSelector } from "react-redux"
import CheckButton from "./check-button"
import FilterButton from "./filter-button"

const Controls: React.FC = () => {
	const invoices = useSelector((state: RootState) => state.invoices)
	const totalInvoices = invoices.length === 0 ? "No Invoices" : `There are ${invoices.length} total invoices`

	return <nav className="grid gap-y-2 gap-x-10 grid-cols-[max-content,1fr,max-content] grid-rows-[repeat(2,max-content)] mt-[72px]" aria-label="invoice filter">
		<h1 className="text-h1 text-white-full col-start-1 col-end-2">Invoices</h1>
		<p className="text-body-2 text-grey-300 col-start-1 col-end-2">{totalInvoices}</p>
		<FilterButton>
			<CheckButton invoiceStatus={PaymentStatus.Draft}>Draft</CheckButton>
			<CheckButton invoiceStatus={PaymentStatus.Pending}>Pending</CheckButton>
			<CheckButton invoiceStatus={PaymentStatus.Paid}>Paid</CheckButton>
		</FilterButton>

		<Button className="bg-purple-600 text-white-full text-h4 col-start-3 col-end-4 row-start-1 self-center row-end-3 !p-2 !pr-[15px] flex items-center gap-4">
			<div className="bg-white-full w-8 h-8 rounded-full grid place-content-center">
				<Image className="transform translate-x-[1px]" src="/icon-plus.svg" alt="" layout="fixed" width="11px" height="11px" />
			</div>
			New Invoice
		</Button>
	</nav>
}

export default Controls

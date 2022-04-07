import { AppDispatch, RootState } from "@lib/stores";
import { addOrRemoveFilter } from "@lib/stores/filter-by-status";
import { PaymentStatus } from "@lib/stores/invoices-types";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

type CheckButtonProps = { invoiceStatus: PaymentStatus };
const CheckButton: React.FC<CheckButtonProps> = ({
	children,
	invoiceStatus,
}) => {
	const filterByStatus = useSelector(
		(state: RootState) => state.filterByStatus
	);
	const dispatch = useDispatch<AppDispatch>();

	const isActive = filterByStatus.includes(invoiceStatus);
	const onClick: MouseEventHandler<HTMLButtonElement> = () =>
		dispatch(addOrRemoveFilter(invoiceStatus));

	return (
		<button onClick={onClick} className="flex items-center gap-[13px]">
			<div
				className={`relative grid h-4 w-4 place-content-center rounded-[2px] border border-purple-600 ${
					isActive ? "bg-purple-600" : "bg-grey-1500 dark:bg-grey-300"
				}`}
			>
				{isActive && (
					<Image
						src="/icon-check.svg"
						alt=""
						layout="fixed"
						width="10px"
						quality={1}
						height="8px"
					/>
				)}
			</div>
			<p className="capitalize text-white-full text-h4 dark:text-black-600">
				{children}
			</p>
		</button>
	);
};

export default CheckButton;

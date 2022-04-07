import Button from "@components/top-level/button";
import { RootState } from "@lib/stores";
import { PaymentStatus } from "@lib/stores/invoices-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckButton from "./check-button";
import FilterButton from "./filter-button";
import NewInvoice from "./new-invoice";

const Controls: React.FC = () => {
	const invoices = useSelector((state: RootState) => state.invoices);
	const [isMobile, setIsMobile] = useState(false);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const onAddNewInvoice = () => setIsFormOpen(true);
	const onFormCancel = () => setIsFormOpen(false);

	useEffect(() => {
		const onResize = () => {
			if (
				isMobile === true &&
				window.matchMedia("(min-width: 640px)").matches
			) {
				setIsMobile(false);
			} else if (
				isMobile === false &&
				!window.matchMedia("(min-width: 640px)").matches
			) {
				setIsMobile(true);
			}
		};

		onResize();
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [isMobile]);

	let totalInvoices = "";
	if (isMobile) {
		totalInvoices =
			invoices.length === 0 ? "No Invoices" : `${invoices.length} invoices`;
	} else {
		totalInvoices =
			invoices.length === 0
				? "No Invoices"
				: `There are ${invoices.length} total invoices`;
	}

	return (
		<nav
			className="mt-[34px] grid grid-cols-[max-content,1fr,max-content] grid-rows-[repeat(2,max-content)] gap-y-1 gap-x-5 sm:mt-[56px] sm:gap-y-2 sm:gap-x-10 md:mt-[72px]"
			aria-label="invoice filter"
		>
			<h1 className="col-start-1 col-end-2 !text-[20px] text-white-full text-h1 dark:text-black-600 sm:!text-[2rem]">
				Invoices
			</h1>
			<p className="col-start-1 col-end-2 text-grey-300 text-body-2 dark:text-grey-600">
				{totalInvoices}
			</p>
			<FilterButton isMobile={isMobile}>
				<CheckButton invoiceStatus={PaymentStatus.Draft}>Draft</CheckButton>
				<CheckButton invoiceStatus={PaymentStatus.Pending}>Pending</CheckButton>
				<CheckButton invoiceStatus={PaymentStatus.Paid}>Paid</CheckButton>
			</FilterButton>

			<Button
				className="col-start-3 col-end-4 row-start-1 row-end-3 flex items-center gap-4 self-center bg-purple-600 !p-2 !pr-[15px] text-white-full text-h4"
				onClick={onAddNewInvoice}
			>
				<div className="grid h-8 w-8 place-content-center rounded-full bg-white-full">
					<Image
						className="translate-x-[1px] transform"
						src="/icon-plus.svg"
						alt=""
						layout="fixed"
						width="11px"
						height="11px"
					/>
				</div>
				{isMobile ? "New" : "New Invoice"}
			</Button>
			<NewInvoice onCancel={onFormCancel} isOpen={isFormOpen} />
		</nav>
	);
};

export default Controls;

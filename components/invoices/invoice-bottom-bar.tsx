import NewInvoice from "@components/home/new-invoice";
import Button from "@components/top-level/button";
import { AppDispatch } from "@lib/stores";
import { deleteByID, markAsPaid } from "@lib/stores/invoices";
import { PaymentStatus } from "@lib/stores/invoices-types";
import { useRouter } from "next/router";
import { InvoiceContext } from "pages/invoices/[id]";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmDeleteModel from "./confirm-delete-model";
import EditInvoice from "./edit-invoice";

const InvoiceBottomBar: React.FC = () => {
	const invoice = useContext(InvoiceContext);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const onMarkAsPaid = () => invoice && dispatch(markAsPaid(invoice.id));

	const [isEditInvoiceOpen, setIsEditInvoiceOpen] = useState(false);
	const onEditInvoiceClick = () => setIsEditInvoiceOpen(true);
	const onEditInvoiceCancel = () => setIsEditInvoiceOpen(false);

	const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
	const onDeleteCancel = () => setIsDeleteModelOpen(false);
	const onDeleteClick = () => {
		if (!invoice) return;
		dispatch(deleteByID(invoice?.id));
		setIsDeleteModelOpen(false);
		router.push("/");
	};

	if (!invoice) return <></>;
	return (
		<nav
			className="-ml-10 flex w-screen justify-center gap-2 bg-grey-1500 px-6 py-[21px] dark:bg-white-full dark:shadow-invoiceBase sm:hidden"
			aria-label="invoice bottom bar controls"
		>
			<Button
				onClick={onEditInvoiceClick}
				className="bg-grey-1200 text-grey-300 text-h4 dark:bg-white-300 dark:text-grey-900"
			>
				Edit
			</Button>
			<EditInvoice
				isOpen={
					invoice.paymentStatus !== PaymentStatus.Draft && isEditInvoiceOpen
				}
				onCancel={onEditInvoiceCancel}
			/>
			<NewInvoice
				isOpen={
					invoice.paymentStatus === PaymentStatus.Draft && isEditInvoiceOpen
				}
				invoice={invoice}
				onCancel={onEditInvoiceCancel}
			/>
			<Button
				onClick={() => setIsDeleteModelOpen(true)}
				className="bg-red-600 text-white-full text-h4"
			>
				Delete
			</Button>
			<ConfirmDeleteModel
				isOpen={isDeleteModelOpen}
				onCancel={onDeleteCancel}
				onDelete={onDeleteClick}
			/>
			<Button
				onClick={onMarkAsPaid}
				className="bg-purple-600 text-white-full text-h4"
			>
				Mark as Paid
			</Button>
		</nav>
	);
};

export default InvoiceBottomBar;

import NewInvoice from "@components/home/new-invoice";
import Button from "@components/top-level/button";
import InvoiceStatus from "@components/top-level/invoice-status";
import { AppDispatch } from "@lib/stores";
import { deleteByID, markAsPaid } from "@lib/stores/invoices";
import { PaymentStatus } from "@lib/stores/invoices-types";
import { useRouter } from "next/router";
import { InvoiceContext } from "pages/invoices/[id]";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmDeleteModel from "./confirm-delete-model";
import EditInvoice from "./edit-invoice";

const InvoiceControls: React.FC = () => {
	const invoice = useContext(InvoiceContext);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
	const onDeleteButtonClick = () => setIsDeleteModelOpen(true);
	const onModelCancel = () => setIsDeleteModelOpen(false);
	const onMarkAsPaid = () => invoice && dispatch(markAsPaid(invoice.id));
	const onDeleteClick = () => {
		if (!invoice) return;
		dispatch(deleteByID(invoice?.id));
		setIsDeleteModelOpen(false);
		router.push("/");
	};

	const [isEditInvoiceOpen, setIsEditInvoiceOpen] = useState(false);
	const onEditInvoiceClick = () => setIsEditInvoiceOpen(true);
	const onEditInvoiceCancel = () => setIsEditInvoiceOpen(false);

	if (!invoice) return <></>;
	return (
		<nav
			className="grid w-full grid-cols-[max-content,1fr,repeat(3,max-content)] grid-rows-1 gap-2 rounded-[8px] bg-grey-1500 px-8 py-5"
			aria-label="invoie controls"
		>
			<h1 className="col-start-1 col-end-[-1] flex items-center justify-between gap-4 text-white-full text-body-1 sm:col-auto sm:justify-start">
				Status <InvoiceStatus status={invoice.paymentStatus} />
			</h1>

			<Button
				onClick={onEditInvoiceClick}
				className="hidden justify-self-end bg-grey-1200 text-grey-300 text-h4 sm:inline-block"
			>
				Edit
			</Button>
			<EditInvoice
				isOpen={
					invoice.paymentStatus === PaymentStatus.Pending && isEditInvoiceOpen
				}
				onCancel={onEditInvoiceCancel}
			/>
			<NewInvoice
				isOpen={
					invoice.paymentStatus === PaymentStatus.Draft && isEditInvoiceOpen
				}
				onCancel={onEditInvoiceCancel}
				invoice={invoice}
			/>
			<Button
				onClick={onDeleteButtonClick}
				className="hidden bg-red-600 text-white-full text-h4 sm:inline-block"
			>
				Delete
			</Button>
			<ConfirmDeleteModel
				isOpen={isDeleteModelOpen}
				onCancel={onModelCancel}
				onDelete={onDeleteClick}
			/>
			<Button
				onClick={onMarkAsPaid}
				className="hidden bg-purple-600 text-white-full text-h4 disabled:opacity-20 sm:inline-block"
				disabled={invoice.paymentStatus !== PaymentStatus.Pending}
			>
				Mark as Paid
			</Button>
		</nav>
	);
};

export default InvoiceControls;

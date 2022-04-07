import Button from "@components/top-level/button";
import Dialog from "@components/top-level/dialog";
import { useDetectClickOutside } from "@lib/click-outside";
import { InvoiceContext } from "pages/invoices/[id]";
import { useContext, useEffect, useRef, useState } from "react";

type ConfirmDeleteModelProps = {
	isOpen: boolean;
	onCancel: () => void;
	onDelete?: () => void;
};
const ConfirmDeleteModel: React.FC<ConfirmDeleteModelProps> = ({
	isOpen,
	onCancel,
	onDelete,
}) => {
	const invoice = useContext(InvoiceContext);
	const [disableClick, setDisableClick] = useState(true);
	const ref = useRef(null);

	useDetectClickOutside({
		ref,
		onTriggered: (e: Event) => {
			onCancel();
		},
		disableClick,
	});

	useEffect(() => {
		let timeoutID: NodeJS.Timeout | undefined = undefined;
		if (isOpen) {
			timeoutID = setTimeout(() => setDisableClick(false), 100);
		} else {
			setDisableClick(true);
		}

		return () => timeoutID && clearTimeout(timeoutID);
	}, [isOpen]);

	if (!invoice) return <></>;

	return (
		<Dialog zIndex={20} isOpen={isOpen}>
			<div
				ref={ref}
				className="mx-6 flex max-w-[480px] flex-col gap-3 place-self-center rounded-[8px] bg-grey-1500 p-12 dark:bg-white-full"
			>
				<h1 className="text-[24px] font-bold leading-[32px] tracking-[-0.8px] text-white-full dark:text-black-600">
					Confirm Deletion
				</h1>
				<p className="text-grey-300 text-body-1 dark:text-grey-900">
					Are you sure you want to delete invoice #{invoice.id}? This action
					cannot be undone.
				</p>
				<div className="mt-1 flex w-full justify-end gap-2">
					<Button
						onClick={onCancel}
						className="bg-grey-1200 text-grey-300 text-h4 dark:bg-white-300 dark:text-grey-900"
					>
						Cancel
					</Button>
					<Button
						onClick={onDelete}
						className="bg-red-600 text-white-full text-h4"
					>
						Delete
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default ConfirmDeleteModel;

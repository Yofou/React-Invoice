import InvoiceForm from "@components/top-level/invoice-aside";
import Button from "@components/top-level/button";
import { SubmitHandler } from "react-hook-form";
import { Invoice, PaymentStatus } from "@lib/stores/invoices-types";
import { createRef, useEffect, useState } from "react";
import { schema as saveSchema } from "@lib/validation-edit";
import { schema as newSchema } from "@lib/validtion-new";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@lib/stores";
import { addOrUpdateInvoice } from "@lib/stores/invoices";

enum SaveAs {
	DRAFT,
	SENT,
}

type NewInvoiceProps = {
	isOpen: boolean;
	onCancel: () => void;
	invoice?: Invoice;
};
const NewInvoice: React.FC<NewInvoiceProps> = ({
	isOpen,
	onCancel,
	invoice,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const formRef = createRef<HTMLFormElement>();
	const [hasBeenChanged, setHasBeenChanged] = useState(false);
	const [count, setCount] = useState(0);
	const [saveAs, setSaveAs] = useState<SaveAs>(SaveAs.SENT);

	const EmitSubmit = (value: SaveAs) => () => {
		setSaveAs(value);
		setCount(count + 1); // I hate myself for this.
		if (!hasBeenChanged) setHasBeenChanged(true);
	};

	useEffect(() => {
		if (!hasBeenChanged) return;
		const submitEvent = new SubmitEvent("submit", {
			bubbles: true,
			cancelable: true,
		});

		formRef?.current?.dispatchEvent(submitEvent);
	}, [saveAs, hasBeenChanged, count]);

	const onSubmit: SubmitHandler<Invoice> = (newInvoice) => {
		newInvoice.paymentStatus =
			saveAs === SaveAs.DRAFT ? PaymentStatus.Draft : PaymentStatus.Pending;
		dispatch(addOrUpdateInvoice(newInvoice));
		onCancel();
	};

	return (
		<InvoiceForm
			invoice={invoice}
			onFormSubmit={onSubmit}
			ref={formRef}
			isOpen={isOpen}
			onCancel={onCancel}
			resolver={saveAs === SaveAs.SENT ? saveSchema : newSchema}
		>
			<>{!invoice ? "New Invoice" : `Edit #${invoice.id}`}</>

			<div className="grid h-full w-full grid-cols-[max-content,1fr,max-content] items-center justify-items-start gap-2">
				<Button
					onClick={onCancel}
					className="bg-[#F9FAFE] text-grey-900 text-h4"
				>
					Discard
				</Button>
				<Button
					onClick={EmitSubmit(SaveAs.DRAFT)}
					className="justify-self-end bg-[#373B53] text-grey-300 text-h4"
				>
					Save as Draft
				</Button>
				<Button
					onClick={EmitSubmit(SaveAs.SENT)}
					className="bg-purple-600 text-white-full text-h4"
				>
					Save & Send
				</Button>
			</div>
		</InvoiceForm>
	);
};

export default NewInvoice;

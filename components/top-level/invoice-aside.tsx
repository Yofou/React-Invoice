import { useDetectClickOutside } from "@lib/click-outside";
import { motion } from "framer-motion";
import { Children, forwardRef, useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import styles from "@styles/invoice-form.module.css";
import InvoiceForm from "@components/top-level/invoice-form";
import { Invoice } from "@lib/stores/invoices-types";
import { SubmitHandler } from "react-hook-form";
import { schema } from "@lib/validation-edit";
import { useSelector } from "react-redux";
import { RootState } from "@lib/stores";

type InvoiceAsideProps = React.PropsWithChildren<{
	invoice?: Invoice;
	isOpen: boolean;
	onCancel: () => void;
	onFormSubmit: SubmitHandler<Invoice>;
	resolver?: any;
}>;
const InvoiceAside = forwardRef<HTMLFormElement, InvoiceAsideProps>(
	(
		{ isOpen, onCancel, children, invoice, onFormSubmit, resolver = schema },
		formRef
	) => {
		const isLightTheme = useSelector((state: RootState) => state.isLightTheme);
		const [title, buttons] = Children.toArray(children);
		const ref = useRef(null);
		const [disableClick, setDisableClick] = useState(true);

		useDetectClickOutside({
			ref,
			onTriggered: (e: Event) => {
				if (e instanceof KeyboardEvent) onCancel();
				if (
					e?.target instanceof HTMLImageElement ||
					e?.target instanceof HTMLButtonElement
				)
					return;
				onCancel();
			},
			disableClick,
		});

		useEffect(() => {
			let timeoutID: NodeJS.Timeout;
			if (isOpen) {
				timeoutID = setTimeout(() => setDisableClick(false), 100);
			} else {
				setDisableClick(true);
			}

			return () => clearTimeout(timeoutID);
		}, [isOpen]);

		return (
			<Dialog className="!absolute md:!fixed" isOpen={isOpen}>
				<motion.aside
					ref={ref}
					className="grid min-h-full w-full max-w-[calc(616px+103px)] grid-rows-[max-content,1fr,91px] bg-black-300 px-6 pt-[calc(80px+32px)] transition-colors dark:bg-white-full md:h-full md:grid-rows-[max-content,calc(100vh-2.25rem-110px-56px),110px] md:pl-[calc(103px+57px)] md:pr-8 md:pt-[56px]"
					initial={{ x: "-100%" }}
					animate={{ x: "0%" }}
					exit={{ x: "-100%" }}
					transition={{ type: "spring", duration: 0.4 }}
				>
					<h1 className="text-white-300 text-h1 dark:text-black-600">
						{title}
					</h1>

					<InvoiceForm
						onFormSubmit={onFormSubmit}
						invoice={invoice}
						ref={formRef}
						resolver={resolver}
					/>

					<div
						className={`${
							styles[isLightTheme ? "bg-shadow-light" : "bg-shadow"]
						} relative -ml-6 -mr-6 rounded-tr-[20px] bg-black-300 px-6 transition-colors dark:bg-white-full md:-ml-[calc(103px+57px)] md:-mr-8 md:pl-[calc(calc(103px+57px))] md:pr-[56px]`}
					>
						{buttons}
					</div>
				</motion.aside>
			</Dialog>
		);
	}
);

InvoiceAside.displayName = "InvoiceAside";

export default InvoiceAside;

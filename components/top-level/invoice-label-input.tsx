import { HTMLInputTypeAttribute } from "react";
import {
	FieldValues,
	UseFormGetFieldState,
	UseFormRegister,
} from "react-hook-form";
import ShortUniqueId from "short-unique-id";
import InvoiceInput from "./invoice-input";
import { Invoice } from "@lib/stores/invoices-types";

type InvoiceLabelInputProps<T> = React.PropsWithChildren<{
	className?: string;
	type?: HTMLInputTypeAttribute;
	value?: T;
	onValueChange?: (value: T) => void;
	register?: ReturnType<UseFormRegister<FieldValues>>;
	defaultValue?: T;
	getFieldState?: UseFormGetFieldState<Invoice>;
}>;

type InvoiceLabelInputComponent = <T extends string | number>(
	props: InvoiceLabelInputProps<T>
) => React.ReactElement<InvoiceLabelInputProps<T>>;
const InvoiceLabelInput: InvoiceLabelInputComponent = ({
	className,
	type = "text",
	children,
	value,
	onValueChange,
	register,
	defaultValue,
	getFieldState,
}) => {
	const id = new ShortUniqueId({ length: 5 })();
	const fieldState = getFieldState && getFieldState(register?.name as any);
	const isError = fieldState?.error;

	return (
		<div
			className={`${className} grid w-full grid-flow-row grid-cols-[1fr,max-content] gap-[10px]`}
		>
			<label
				className={`text-body-1 ${
					isError ? "text-red-600" : "text-grey-300 dark:text-grey-900"
				}`}
				htmlFor={id}
			>
				{children}
			</label>
			{isError && (
				<p className="!text-xs text-red-600 text-h4">{isError?.message}</p>
			)}
			<InvoiceInput
				className={`col-start-1 col-end-[-1] ${isError && "!border-red-600"}`}
				id={id}
				type={type}
				value={value}
				onValueChange={onValueChange}
				register={register}
				defaultValue={defaultValue}
			/>
		</div>
	);
};

export default InvoiceLabelInput;

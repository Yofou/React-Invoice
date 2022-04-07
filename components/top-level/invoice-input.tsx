import { HTMLInputTypeAttribute } from "react";
import style from "@styles/invoice-input.module.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InvoiceInputProps<T> = {
	className?: string;
	id?: string;
	key?: string;
	type?: HTMLInputTypeAttribute;
	value?: T;
	onValueChange?: (value: T) => void;
	register?: ReturnType<UseFormRegister<FieldValues>>;
	defaultValue?: T;
};

type InvoiceInputComponent = <T extends string | number>(
	prop: InvoiceInputProps<T>
) => React.ReactElement<InvoiceInputProps<T>>;
const InvoiceInput: InvoiceInputComponent = ({
	type = "text",
	id,
	className,
	register,
	defaultValue,
	key,
}) => {
	return (
		<input
			key={key}
			id={id}
			className={`${className} ${style.input} w-full  rounded-[4px] border border-grey-1200 bg-grey-1500 px-5 py-4 text-white-full caret-purple-600 outline-none transition-colors text-h4 focus:border-purple-600 dark:border-grey-300 dark:bg-white-full dark:text-black-600 dark:focus:border-purple-300 `}
			type={type}
			min="0"
			defaultValue={defaultValue}
			{...register}
		/>
	);
};

export default InvoiceInput;

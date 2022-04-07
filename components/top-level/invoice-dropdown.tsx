import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { motion } from "framer-motion";

type InvoiceDropDownProps<T> = React.PropsWithChildren<{
	id?: string;
	selected: T;
	onOptionSelected: (value: T) => void;
	options: T[];
	optionDisplay?: (value: T) => string;
}>;

type InvoiceDropDownComponent = <T>(
	props: InvoiceDropDownProps<T>
) => React.ReactElement<InvoiceDropDownProps<T>>;
const InvoiceDropDown: InvoiceDropDownComponent = ({
	id,
	options,
	onOptionSelected,
	selected,
	optionDisplay = (value) => value,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

	type T = typeof options[number];
	const onDropdownClick = () => setIsOpen(!isOpen);
	const onSelected = (value: T) => () => {
		onOptionSelected(value);
		setIsOpen(false);
	};

	return (
		<div ref={ref} className="relative z-30">
			<button
				id={id}
				type="button"
				onClick={onDropdownClick}
				className="flex w-full items-center justify-between rounded-[4px] border border-grey-1200 bg-grey-1500 py-4 px-5 text-white-full text-h4 dark:border-grey-300 dark:bg-white-full dark:text-black-600"
			>
				{optionDisplay(selected)}
				<Image
					className={`transform transition-transform ${
						isOpen ? "-rotate-180" : ""
					}`}
					src="/icon-arrow-down.svg"
					alt=""
					layout="fixed"
					width="10px"
					height="7px"
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute top-[calc(100%+8px)] left-0 z-20 flex w-full flex-col rounded-[8px] bg-grey-1200 shadow-darkShadow dark:bg-white-full dark:shadow-lightShadow"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							type: "spring",
							damping: 10,
							stiffness: 100,
							duration: 200,
						}}
					>
						{options.map((option, index) => (
							<button
								type="button"
								className="border-b border-grey-1500 px-6 py-4 text-left text-grey-300 text-h4 last-of-type:border-b-0 hover:text-purple-600 dark:border-grey-300 dark:text-black-600 dark:hover:text-purple-600"
								onClick={onSelected(option)}
								key={index}
							>
								{optionDisplay(option)}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default InvoiceDropDown;

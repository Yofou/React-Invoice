import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

type FilterButtonProps = { isMobile: boolean };
const FilterButton: React.FC<FilterButtonProps> = ({ children, isMobile }) => {
	let [isOpen, setIsOpen] = useState(false);

	const ref = useDetectClickOutside({
		onTriggered: () => setIsOpen(false),
	});

	return (
		<div
			className="relative col-start-2 col-end-3 row-start-1 row-end-3 self-center justify-self-end"
			ref={ref}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-4 text-left text-white-full text-h4 dark:text-black-600"
			>
				{isMobile ? "Filter" : "Filter by status"}
				<Image
					className={`transform transition-transform ${
						isOpen ? "-rotate-180" : ""
					}`}
					src="/icon-arrow-down.svg"
					alt=""
					layout="fixed"
					width="11px"
					height="7px"
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute top-[calc(100%+23px)] left-1/2 z-10 flex w-full min-w-[193px] flex-col gap-4 rounded-[8px] bg-grey-1200 p-6 shadow-darkShadow dark:bg-white-full dark:shadow-lightShadow"
						initial={{ opacity: 0, translateX: "-50%" }}
						animate={{ opacity: 1, translateX: "-50%" }}
						exit={{ opacity: 0, translateX: "-50%" }}
						transition={{ type: "spring", duration: 0.4 }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FilterButton;

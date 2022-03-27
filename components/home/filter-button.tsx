import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"

type FilterButtonProps = { isMobile: boolean }
const FilterButton: React.FC<FilterButtonProps> = ({ children, isMobile }) => {
	let [isOpen, setIsOpen] = useState(false)

	const ref = useDetectClickOutside({
		onTriggered: () => setIsOpen(false)
	})

	return <div className="relative col-start-2 col-end-3 row-start-1 row-end-3 justify-self-end self-center" ref={ref}>
		<button onClick={() => setIsOpen(!isOpen)} className="flex gap-4 items-center text-h4 text-white-full text-left">
			{isMobile ? "Filter" : "Filter by status"}
			<Image className={`transition-transform transform ${isOpen ? "-rotate-180" : ""}`} src="/icon-arrow-down.svg" alt="" layout="fixed" width="11px" height="7px" />
		</button>

		<AnimatePresence>
			{isOpen && (
				<motion.div 
					className="absolute top-[calc(100%+23px)] z-10 left-1/2 w-full min-w-[193px] bg-grey-1200 p-6 rounded-[8px] flex flex-col gap-4"
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
}

export default FilterButton

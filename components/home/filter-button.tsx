import { useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"

type FilterButtonProps = {}
const FilterButton: React.FC<FilterButtonProps> = ({ children }) => {
	let [isOpen, setIsOpen] = useState(false)

	const ref = useDetectClickOutside({
		onTriggered: () => setIsOpen(false)
	})

	return <div className="relative col-start-2 col-end-3 row-start-1 row-end-3 justify-self-end self-center" ref={ref}>
		<button onClick={() => setIsOpen(!isOpen)} className="flex gap-4 items-center text-h4 text-white-full text-left">
			Filter by status
			<img className={`transition-transform transform ${isOpen ? "-rotate-180" : ""}`} src="/icon-arrow-down.svg" alt="" />
		</button>

		{isOpen && (
			<div className="absolute top-[calc(100%+23px)] left-1/2 w-full min-w-[193px] bg-grey-1200 p-6 rounded-[8px] transform -translate-x-1/2 flex flex-col gap-4">
				{children}
			</div>
		)}
	</div>
}

export default FilterButton

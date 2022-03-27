import { AnimatePresence, motion, Variants } from "framer-motion"

type DialogProps = { isOpen: boolean, zIndex?: number }
const Dialog: React.FC<DialogProps> = ({ children, isOpen, zIndex=10 }) => {
	const varients: Variants = {
		hidden: {
			backgroundColor: "rgba(0, 0, 0, 0)",
			zIndex,
		},
		visable: (i: number) => ({
			backgroundColor: `rgba(0, 0, 0, ${i})`,
			zIndex
		})
	}

	return <AnimatePresence>
		{isOpen && <motion.div 
			className="fixed grid w-full h-full top-0 left-0" 
			initial="hidden"
			exit={{ opacity: 0 }}
			animate="visable"
			custom={0.5}
			variants={varients}
		>
			{children}
		</motion.div>}
	</AnimatePresence> 
}

export default Dialog

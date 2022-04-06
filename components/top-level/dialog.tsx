import { AnimatePresence, motion, Variants } from "framer-motion";

type DialogProps = { className?: string; isOpen: boolean; zIndex?: number };
const Dialog: React.FC<DialogProps> = ({
	children,
	isOpen,
	zIndex = 10,
	className,
}) => {
	const varients: Variants = {
		hidden: {
			backgroundColor: "rgba(0, 0, 0, 0)",
			zIndex,
		},
		visable: (i: number) => ({
			backgroundColor: `rgba(0, 0, 0, ${i})`,
			zIndex,
		}),
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={`${className} fixed top-0 left-0 grid min-h-full w-full overflow-y-scroll`}
					initial="hidden"
					exit={{ opacity: 0 }}
					animate="visable"
					custom={0.5}
					variants={varients}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Dialog;

import { DateTime } from "luxon";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { InvoiceContext } from "pages/invoices/[id]";
import { PaymentStatus } from "@lib/stores/invoices-types";

type InvoiceCalenderProps = {
	id?: string;
	selected: number;
	setSelected: (value: number) => void;
};
const InvoiceCalender: React.FC<InvoiceCalenderProps> = ({
	id,
	selected,
	setSelected,
}) => {
	const invoice = useContext(InvoiceContext);
	const containerRef = useRef<HTMLDivElement>(null);
	const [view, setView] = useState(DateTime.now());
	const [isOpen, setIsOpen] = useState(false);
	const [direction, setDirection] = useState(1);
	const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

	const getKey = (value: number) => view.plus({ days: value + 1 }).toMillis();
	const remainderDays = 35 - view.daysInMonth;
	const onCalenderClick = () => setIsOpen(!isOpen);
	const onMonthInc = async () => {
		setDirection(1);
		// tick update to allow state changes
		await new Promise((resolve) => resolve(undefined));
		setView(view.plus({ month: 1 }));
	};

	const onMonthDec = async () => {
		setDirection(-1);
		// tick update to allow state changes
		await new Promise((resolve) => resolve(undefined));
		setView(view.minus({ month: 1 }));
	};

	const onDatePick = (day: number) => () => {
		const date = view.set({ day });
		setSelected(date.toMillis());
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen === false) {
			setView(DateTime.now());
		}
	}, [isOpen, selected]);

	useEffect(() => {
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") onMonthDec();
			if (event.key === "ArrowRight") onMonthInc();
		};

		window.addEventListener("keyup", onKeyUp);
		return () => window.removeEventListener("keyup", onKeyUp);
	});

	const animationButtonVarient: Variants = {
		moveOut: (i: number) => ({
			translateX: `${
				direction * (-1 * (containerRef.current?.clientWidth ?? 260))
			}px`,
			transition: {
				type: "tween",
				duration: 0.15,
			},
		}),
		moveIn: (i: number) => ({
			translateX: "0px",
			transition: {
				type: "tween",
				duration: 0.15,
			},
		}),
		inital: (i: number) => ({
			translateX: `${direction * (containerRef.current?.clientWidth ?? 260)}px`,
		}),
	};

	return (
		<div ref={ref} className="relative">
			<button
				onClick={onCalenderClick}
				className="flex w-full justify-between rounded-[4px] border border-grey-1200 bg-grey-1500 px-5 py-4 text-white-full text-h4 disabled:opacity-40 dark:border-grey-300 dark:bg-white-full dark:text-black-600 dark:disabled:opacity-40"
				id={id}
				type="button"
				disabled={invoice?.paymentStatus !== PaymentStatus.Draft}
			>
				{DateTime.fromMillis(selected).toFormat("d LLL yyyy")}
				<Image
					layout="fixed"
					width="16px"
					height="16px"
					src="/icon-calendar.svg"
					alt=""
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<div
						ref={containerRef}
						className="absolute top-[calc(100%+8px)] left-0 z-40 grid w-full grid-cols-7 grid-rows-[repeat(6,15px)] items-center gap-y-4 gap-x-[14px] overflow-hidden rounded-[8px] bg-grey-1200 px-[18px] pb-8 pt-6 shadow-darkShadow dark:bg-white-full dark:shadow-lightShadow"
					>
						<button
							type="button"
							className="col-start-1 col-end-2 row-start-1 row-end-2"
							onClick={onMonthDec}
						>
							<Image
								src="/icon-arrow-left.svg"
								alt=""
								layout="fixed"
								width="7px"
								height="10px"
							/>
						</button>
						<h1 className="col-start-2 col-end-7 row-start-1 row-end-2 text-center text-white-full text-h4 dark:text-black-600">
							{view.toFormat("LLL yyyy")}
						</h1>
						<button
							type="button"
							className="col-start-[-2] col-end-[-1] row-start-1 row-end-2"
							onClick={onMonthInc}
						>
							<Image
								src="/icon-arrow-right.svg"
								alt=""
								layout="fixed"
								width="7px"
								height="10px"
							/>
						</button>

						<AnimatePresence initial={false} exitBeforeEnter>
							{Array.from({ length: view.daysInMonth }).map((_, index) => (
								<motion.button
									type="button"
									onClick={onDatePick(index + 1)}
									className="text-center text-white-full text-h4 hover:text-purple-600 dark:text-black-600"
									key={getKey(index)}
									custom={index}
									variants={animationButtonVarient}
									initial="inital"
									animate="moveIn"
									exit="moveOut"
								>
									{index + 1}
								</motion.button>
							))}
						</AnimatePresence>

						<AnimatePresence initial={false} exitBeforeEnter>
							{Array.from({ length: remainderDays }).map((_, index) => (
								<motion.p
									className="text-center text-grey-300/[.8] text-h4"
									key={getKey(view.daysInMonth + index)}
									custom={view.daysInMonth + index}
									variants={animationButtonVarient}
									initial="inital"
									animate="moveIn"
									exit="moveOut"
								>
									{index + 1}
								</motion.p>
							))}
						</AnimatePresence>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default InvoiceCalender;

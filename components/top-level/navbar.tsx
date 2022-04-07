import { AppDispatch, RootState } from "@lib/stores";
import { toggleTheme } from "@lib/stores/lightTheme";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const NavBar: React.FC = () => {
	const isLightTheme = useSelector((state: RootState) => state.isLightTheme);
	const dispatch = useDispatch<AppDispatch>();
	const onThemeToggle = () => dispatch(toggleTheme());

	return (
		<nav
			className="z-20 grid h-full w-full grid-cols-[80px,1fr,max-content] gap-8 overflow-hidden bg-grey-1500 transition-colors dark:bg-[#373B53] md:grid-cols-1 md:grid-rows-[103px,1fr,max-content] md:rounded-r-[20px]"
			aria-label="primary navigation"
		>
			<Link href="/">
				<a className="relative h-[80px] w-full overflow-hidden rounded-r-[20px] md:h-[103px]">
					<Image
						className="h-full w-full object-cover"
						layout="fill"
						src="/logo.svg"
						alt="invoice app"
					/>
				</a>
			</Link>

			<button
				onClick={onThemeToggle}
				className="justify-self-end md:self-end md:justify-self-center"
			>
				<Image
					src={isLightTheme ? "/icon-moon.svg" : "/icon-sun.svg"}
					width={20}
					height={20}
					layout="fixed"
					alt={isLightTheme ? "dark mode" : "light mode"}
				/>
			</button>

			<div className="grid place-content-center border-l border-[color:#494E6E] px-8 py-6 md:border-l-0 md:border-t md:px-0">
				<Image
					className="rounded-full"
					layout="fixed"
					width={40}
					height={40}
					src="/image-avatar.jpg"
					alt="profile"
				/>
			</div>
		</nav>
	);
};

export default NavBar;

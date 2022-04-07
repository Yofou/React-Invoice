import NavBar from "@components/top-level/navbar";
import { AppDispatch, RootState } from "@lib/stores";
import { replace } from "@lib/stores/invoices";
import { Invoice } from "@lib/stores/invoices-types";
import { setLightTheme } from "@lib/stores/lightTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type LayoutProps = { className?: string };
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
	const dispatch = useDispatch<AppDispatch>();
	const isLightTheme = useSelector((state: RootState) => state.isLightTheme);

	useEffect(() => {
		const invoices = JSON.parse(
			localStorage.getItem("invoices") ?? "[]"
		) as Invoice[];

		const lightTheme = (localStorage.getItem("lightTheme") ?? false) === "true";

		dispatch(replace(invoices));
		dispatch(setLightTheme(lightTheme));
	}, [dispatch]);

	useEffect(() => {
		if (isLightTheme) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [isLightTheme]);

	return (
		<>
			<NavBar />
			<main className={`h-full w-full ${className}`}>{children}</main>
		</>
	);
};

export default Layout;

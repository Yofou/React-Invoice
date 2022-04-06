import NavBar from "@components/top-level/navbar";
import { AppDispatch } from "@lib/stores";
import { replace } from "@lib/stores/invoices";
import { Invoice } from "@lib/stores/invoices-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type LayoutProps = { className?: string };
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const invoices = JSON.parse(
			localStorage.getItem("invoices") ?? "[]"
		) as Invoice[];

		dispatch(replace(invoices));
	}, [dispatch]);

	return (
		<>
			<NavBar />
			<main className={`h-full w-full ${className}`}>{children}</main>
		</>
	);
};

export default Layout;

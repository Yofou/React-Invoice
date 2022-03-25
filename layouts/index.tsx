import NavBar from "@components/top-level/navbar"

type LayoutProps = { className?: string }
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
	return <>
		<NavBar />
		<main className={`w-full h-full ${className}`}>
			{children}
		</main>
	</>
}

export default Layout

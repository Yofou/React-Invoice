import NavBar from "@components/top-level/navbar"

export const Layout: React.FC = ({ children }) => {
	return <>
		<NavBar />
		<main className="w-full h-full">
			{children}
		</main>
	</>
}

export default Layout

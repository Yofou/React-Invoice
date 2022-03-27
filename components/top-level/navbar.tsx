import Image from "next/image"
import Link from "next/link"

const NavBar: React.FC = () => {
	return <nav 
		className="w-full h-full bg-grey-1500 z-20 grid gap-8 grid-cols-[80px,1fr,max-content] md:grid-rows-[103px,1fr,max-content] md:grid-cols-1 md:rounded-r-[20px] overflow-hidden"
		aria-label="primary navigation"
	>
		<Link href="/">
			<a className="w-full h-[80px] md:h-[103px] relative overflow-hidden rounded-r-[20px]">
				<Image className="w-full h-full object-cover" layout="fill" src="/logo.svg" alt="invoice app"/>
			</a>
		</Link>

		<button className="justify-self-end md:justify-self-center md:self-end">
			<Image src="/icon-sun.svg" width={20} height={20} layout="fixed" alt="light mode" />
		</button>

		<div className="grid px-8 md:px-0 py-6 place-content-center border-l md:border-l-0 md:border-t border-[color:#494E6E]">
			<Image className="rounded-full" layout="fixed" width={40} height={40} src="/image-avatar.jpg" alt="profile" />
		</div>
	</nav>
}

export default NavBar

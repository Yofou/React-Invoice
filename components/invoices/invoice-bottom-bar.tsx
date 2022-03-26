import Button from "@components/top-level/button"

const InvoiceBottomBar: React.FC = () => {
	return <nav className="sm:hidden w-screen bg-grey-1500 px-6 py-[21px] flex gap-2 justify-center -ml-10" aria-label="invoice bottom bar controls">
		<Button className="text-grey-300 text-h4 bg-grey-1200">Edit</Button>
		<Button className="text-white-full text-h4 bg-red-600">Delete</Button>
		<Button className="text-white-full text-h4 bg-purple-600">Mark as Paid</Button>
	</nav>
}

export default InvoiceBottomBar

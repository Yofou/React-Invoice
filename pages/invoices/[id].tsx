import Layout from "@layouts/index";
import { RootState } from "@lib/stores";
import { Invoice } from "@lib/stores/invoices-types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useSelector } from "react-redux";
import InvoiceControls from "@components/invoices/controls";
import InvoiceView from "@components/invoices/invoice-view";
import InvoiceBottomBar from "@components/invoices/invoice-bottom-bar";
import NotFoundPage from "../404"

export const InvoiceContext = createContext<Invoice | undefined>(undefined) 

const InvoicePage: NextPage = () => {
	const router = useRouter()
	const invoice = useSelector((state: RootState) => {
		return state.invoices.find( item => item.id === router.query.id )
	})

	if (!invoice) return <NotFoundPage />

	return <InvoiceContext.Provider value={invoice}>
			<Layout className="grid grid-cols-[minmax(0,730px)] justify-center grid-rows-[repeat(3,max-content),1fr] sm:grid-rows-[repeat(3,max-content)] gap-y-6 py-16 p-10 pb-0 sm:pb-16">
				<Link href="/">
					<a className="flex gap-[23px] justify-self-start items-center text-white-full text-h4">
						<Image src="/icon-arrow-left.svg" alt="<" layout="fixed" width="7" height="10px" />
						Go back
					</a>
				</Link>

				<InvoiceControls />
				<InvoiceView />
				<InvoiceBottomBar />
			</Layout>
	</InvoiceContext.Provider>
}

export default InvoicePage

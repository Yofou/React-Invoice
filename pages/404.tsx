import Layout from "@layouts/index";
import { NextPage } from "next";
import Image from "next/image";

const NotFound: NextPage = () => {
	return <Layout className="grid grid-cols-[minmax(0,750px)] grid-rows-[max-content,1fr] justify-center place-items-center">
		<h1 className="text-h1 text-white-full mt-[72px]">404 Not Found</h1>
		<Image layout="fixed" width="240px" height="200px" src="/404.svg" alt="404 not found" />
	</Layout>
}

export default NotFound

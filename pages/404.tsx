import Layout from "@layouts/index";
import { NextPage } from "next";
import Image from "next/image";

const NotFound: NextPage = () => {
	return (
		<Layout className="grid grid-cols-[minmax(0,750px)] grid-rows-[max-content,1fr] place-items-center justify-center">
			<h1 className="mt-[72px] text-white-full text-h1">404 Not Found</h1>
			<Image
				layout="fixed"
				width="240px"
				height="200px"
				src="/404.svg"
				alt="404 not found"
			/>
		</Layout>
	);
};

export default NotFound;

import Controls from '@components/home/controls'
import Layout from '@layouts/index'
import type { NextPage } from 'next'

const Home: NextPage = () => {
	return <Layout className="grid grid-cols-[minmax(0,730px)] grid-rows-[repeat(2,max-content)] justify-center">
		<Controls />
	</Layout>
}

export default Home

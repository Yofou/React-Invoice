import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@lib/stores'
import { inc, dec } from '@lib/stores/example'
import Button from '@components/top-level/button'
import Link from 'next/link'
import Layout from '@layouts/index'

const Count: NextPage = () => {
	const counter = useSelector( (state: RootState) => state.counter )
	const dispatch = useDispatch<AppDispatch>()

	return <Layout>
		<h1 className="text-h1">Total {counter}</h1>
		<Button onClick={() => dispatch(inc())}>inc</Button>
		<button onClick={() => dispatch(dec())}>dec</button>
		<Link href="/">
			<a>Home</a>
		</Link>
	</Layout>
}

export default Count

import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@lib/stores'
import { inc, dec } from '@lib/stores/example'
import Button from '@components/button'

const Home: NextPage = () => {
	const counter = useSelector( (state: RootState) => state.counter )
	const dispatch = useDispatch<AppDispatch>()

	return <>
		<h1 className="text-h1">Total {counter}</h1>
		<Button className="" onClick={() => dispatch(inc())}>inc</Button>
		<button onClick={() => dispatch(dec())}>dec</button>
	</>
}

export default Home

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../lib/stores'
import Layout from '@layouts/index'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return <Provider store={store}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</Provider>
}

export default App
